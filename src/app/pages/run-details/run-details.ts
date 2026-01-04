import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

import {InstrumentRunResponse} from '../../core/api/api-types';
import {RunsApi} from '../../core/api/runs.api';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import {delay, dematerialize, finalize, materialize, take} from 'rxjs/operators';

import {RunConfiguration} from './run-configuration/run-configuration';
import {RunSummary} from './run-summary/run-summary';
import {SubmitMeasurementsPayload} from './measurements-form/measurements-form';

@Component({
  selector: 'app-run-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    RunConfiguration,
    RunSummary,
  ],
  templateUrl: './run-details.html',
  styleUrls: ['./run-details.scss'],
})
export class RunDetails implements OnInit, OnDestroy {
  runId!: number;

  isLoadingRun = false;
  runLoadError: string | null = null;

  run: InstrumentRunResponse | null = null;

  isSubmittingMeasurements = false;

  private pollingIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly runsApi: RunsApi,
    private readonly cdr: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.runId = Number(rawId);

    // Don't auto-load if invalid; show error state
    if (!rawId || !this.isValidRunId(this.runId)) {
      this.runLoadError = rawId
        ? `Invalid run id: ${rawId}`
        : 'Missing run id in route';
      return;
    }

    this.loadRun();
  }

  loadRun(): void {
    this.isLoadingRun = true;
    this.runLoadError = null;
    this.run = null;
    this.cdr.markForCheck();

    this.runsApi.getInstrumentRunById(this.runId)
      .pipe(
        // delay both success+error by 1s (your current behavior)
        materialize(),
        delay(300),
        dematerialize(),
        finalize(() => {
          this.isLoadingRun = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (run) => {
          this.run = run;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.runLoadError = 'Failed to load run. Please try again.';
          this.cdr.markForCheck();
        }
      });
  }

  private isValidRunId(id: number): boolean {
    return Number.isFinite(id) && Number.isInteger(id) && id > 0;
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private startPolling(): void {
    // Clear any existing polling
    this.stopPolling();

    // Poll every 2 seconds
    this.pollingIntervalId = setInterval(() => {
      // Stop polling if we reach a terminal state
      if (this.run?.status === 'SUCCEEDED' || this.run?.status === 'FAILED') {
        this.stopPolling();
        return;
      }

      // Silently refresh the run (no loading spinner)
      this.runsApi.getInstrumentRunById(this.runId)
        .subscribe({
          next: (run) => {
            this.run = run;
            this.cdr.markForCheck();

            // Stop polling if we've reached a terminal state
            if (run.status === 'SUCCEEDED' || run.status === 'FAILED') {
              this.stopPolling();
            }
          },
          error: (err) => {
            console.error('Polling error:', err);
            // Continue polling even on error
          }
        });
    }, 500);
  }

  private stopPolling(): void {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);
      this.pollingIntervalId = null;
    }
  }

  onSubmitMeasurements(payload: SubmitMeasurementsPayload): void {
    this.isSubmittingMeasurements = true;
    this.cdr.markForCheck();

    this.runsApi.submitMeasurements(this.runId, payload)
      .pipe(
        finalize(() => {
          this.isSubmittingMeasurements = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (updatedRun) => {
          // Success - use the updated run from the response
          this.run = updatedRun;
          this.cdr.markForCheck();

          // Start polling for processing updates
          this.startPolling();
        },
        error: (err) => {
          console.error('Failed to submit measurements:', err);

          // Show error toast
          this.snackBar.open('Failed to submit measurements. Please try again.', 'Dismiss', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      });
  }
}
