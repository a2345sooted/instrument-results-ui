import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

import {InstrumentRunResponse} from '../../core/api/api-types';
import {RunsApi} from '../../core/api/runs.api';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

import {delay, dematerialize, finalize, materialize, take} from 'rxjs/operators';

import {RunConfiguration} from './run-configuration/run-configuration';
import {RunSummary} from './run-summary/run-summary';

@Component({
  selector: 'app-run-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RunConfiguration,
    RunSummary,
  ],
  templateUrl: './run-details.html',
  styleUrls: ['./run-details.scss'],
})
export class RunDetails implements OnInit {
  runId!: number;

  isLoadingRun = false;
  runLoadError: string | null = null;

  run: InstrumentRunResponse | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly runsApi: RunsApi,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.runId = Number(rawId);

    // Don’t auto-load if invalid; show error state
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
}
