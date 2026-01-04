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

import { delay, finalize, materialize, dematerialize } from 'rxjs/operators';

import { UuidService } from '../../core/uuid/uuid.service';
import { RunsApi, Instrument } from '../../core/api/runs.api';

@Component({
  selector: 'app-create-run',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
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

  isLoadingInstruments = false;
  instrumentsLoadError: string | null = null;

  constructor(
    private readonly uuidService: UuidService,
    private readonly runsApi: RunsApi,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(): void {
    console.log('[CreateRun] loadInstruments() start', new Date().toISOString());

    this.isLoadingInstruments = true;
    this.instrumentsLoadError = null;
    this.instruments = [];
    this.cdr.markForCheck();

    this.runsApi
      .getInstruments()
      .pipe(
        // ✅ THIS delays both success AND error by 1s
        materialize(),
        delay(1000),
        dematerialize(),

        finalize(() => {
          this.isLoadingInstruments = false;
          console.log('[CreateRun] loadInstruments() finalize');
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (instruments) => {
          console.log('[CreateRun] instruments next', instruments?.length);
          this.instruments = instruments ?? [];
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.log('[CreateRun] instruments error', err);
          this.instrumentsLoadError = 'Failed to load instruments.';
          this.cdr.markForCheck();
        },
        complete: () => console.log('[CreateRun] instruments complete'),
      });
  }

  generateFakeExternalRef(): void {
    const uuid = this.uuidService.generateUUID();

    this.form.controls.externalReferenceId.setValue(uuid);
    this.form.controls.externalReferenceId.markAsDirty();
    this.form.controls.externalReferenceId.markAsTouched();
  }

  createRun(): void {
    // intentionally empty for now
  }
}
