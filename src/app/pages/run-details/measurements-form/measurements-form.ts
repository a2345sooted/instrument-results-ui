import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {InstrumentRunResponse} from '../../../core/api/api-types';

export interface SubmitMeasurementsPayload {
  measurements: { [key: string]: number };
}

@Component({
  selector: 'app-measurements-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './measurements-form.html',
  styleUrl: './measurements-form.scss',
})
export class MeasurementsForm implements OnInit {
  @Input({ required: true }) run!: InstrumentRunResponse;

  private _isSubmitting = false;
  @Input()
  set isSubmitting(value: boolean) {
    this._isSubmitting = value;
    if (this.measurementsGroup) {
      if (value) {
        this.measurementsGroup.disable();
      } else {
        this.measurementsGroup.enable();
      }
    }
  }
  get isSubmitting(): boolean {
    return this._isSubmitting;
  }

  @Output() submitMeasurements = new EventEmitter<SubmitMeasurementsPayload>();

  public form!: FormGroup;
  public measurementsGroup!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    // Build a FormGroup for each measurement
    const measurementsControls: { [key: string]: any } = {};

    for (const measurement of this.run.requiredMeasurements) {
      measurementsControls[measurement.code] = [
        '',
        [Validators.required, this.numericValidator()]
      ];
    }

    this.measurementsGroup = this.fb.group(measurementsControls);

    this.form = this.fb.group({
      measurements: this.measurementsGroup
    });
  }

  private numericValidator() {
    return (control: any) => {
      if (!control.value) {
        return null; // Let required validator handle empty
      }

      const value = control.value.toString().trim();

      // Allow negative numbers and decimals
      const isValid = /^-?\d*\.?\d+$/.test(value);

      if (!isValid) {
        return { numeric: true };
      }

      // Check if it's a valid number
      const num = parseFloat(value);
      if (isNaN(num)) {
        return { numeric: true };
      }

      return null;
    };
  }

  getControl(measurementCode: string) {
    return this.measurementsGroup.get(measurementCode);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      // Mark all as touched to show validation errors
      Object.keys(this.measurementsGroup.controls).forEach(key => {
        this.measurementsGroup.get(key)?.markAsTouched();
      });
      return;
    }

    // Convert string values to numbers for API
    const payload: SubmitMeasurementsPayload = {
      measurements: {} as { [key: string]: number }
    };

    Object.keys(this.measurementsGroup.value).forEach(key => {
      payload.measurements[key] = parseFloat(this.measurementsGroup.value[key]);
    });

    // Emit the payload to parent
    this.submitMeasurements.emit(payload);
  }
}
