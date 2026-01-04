import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { delay, finalize, materialize, dematerialize } from 'rxjs/operators';

import { UuidService } from '../../core/uuid/uuid.service';
import {Instrument, InstrumentRunResponse} from '../../core/api/api-types';
import {RunsApi} from '../../core/api/runs.api';

@Component({
  selector: 'app-create-run',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-run.html',
  styleUrl: './create-run.scss',
})
export class CreateRun implements OnInit {
  readonly form = new FormGroup({
    instrumentId: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    externalReferenceId: new FormControl<string>(''),
  });

  instruments: Instrument[] = [];

  // instrument list loading states
  isLoadingInstruments = false;
  instrumentsLoadError: string | null = null;

  // create run submission states
  isCreatingRun = false;
  createRunError: string | null = null;
  createdRun: InstrumentRunResponse | null = null;

  constructor(
    private readonly uuidService: UuidService,
    private readonly runsApi: RunsApi,
    private readonly cdr: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(): void {
    this.isLoadingInstruments = true;
    this.instrumentsLoadError = null;
    this.instruments = [];
    this.cdr.markForCheck();

    this.runsApi
      .getInstruments()
      .pipe(
        // delay both success+error by 1s (your current behavior)
        materialize(),
        delay(300),
        dematerialize(),
        finalize(() => {
          this.isLoadingInstruments = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (instruments) => {
          this.instruments = instruments ?? [];
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.log('[CreateRun] instruments error', err);
          this.instrumentsLoadError = 'Failed to load instruments.';
          this.cdr.markForCheck();
        },
      });
  }

  generateFakeExternalRef(): void {
    if (this.isCreatingRun) return;

    const uuid = this.uuidService.generateUUID();

    this.form.controls.externalReferenceId.setValue(uuid);
    this.form.controls.externalReferenceId.markAsDirty();
    this.form.controls.externalReferenceId.markAsTouched();
  }

  createRun(): void {
    if (this.isCreatingRun) return;

    this.createRunError = null;
    this.createdRun = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const instrumentId = this.form.controls.instrumentId.value;
    const instrument = this.instruments.find((i) => i.id === instrumentId);

    if (!instrument) {
      this.createRunError = 'Please select a valid instrument.';
      this.cdr.markForCheck();
      return;
    }

    const externalRefRaw = this.form.controls.externalReferenceId.value ?? '';
    const externalReference =
      externalRefRaw.trim().length > 0 ? externalRefRaw.trim() : undefined;

    this.isCreatingRun = true;
    this.form.disable({ emitEvent: false });
    this.cdr.markForCheck();

    this.runsApi
      .createInstrumentRun({
        instrumentCode: instrument.code,
        externalReference,
      })
      .pipe(
        finalize(() => {
          this.isCreatingRun = false;
          this.form.enable({ emitEvent: false });
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (created) => {
          this.createdRun = created;

          // ✅ green toast
          this.snackBar.open(`Run #${created.id} created`, undefined, {
            duration: 2000,
            panelClass: ['snack-success'],
          });

          // ✅ wait 1s then navigate
          setTimeout(() => {
            this.router.navigateByUrl(`/runs/${created.id}`);
          }, 1000);

          this.cdr.markForCheck();
        },
        error: (err) => {
          console.log('[CreateRun] createRun error', err);

          // ✅ updated text
          this.createRunError = 'Failed to create run. Please try again.';
          this.cdr.markForCheck();
        },
      });
  }
}
