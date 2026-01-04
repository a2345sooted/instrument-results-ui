import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InstrumentRunResponse } from '../../../core/api/api-types';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RunMoreInfoDialog } from './run-more-info-dialog/run-more-info-dialog';
import { MeasurementsForm, SubmitMeasurementsPayload } from '../measurements-form/measurements-form';
import { MeasurementsDisplay } from '../measurements-display/measurements-display';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-run-configuration',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MeasurementsForm, MeasurementsDisplay],
  templateUrl: './run-configuration.html',
  styleUrl: './run-configuration.scss',
})
export class RunConfiguration {
  @Input({ required: true }) run!: InstrumentRunResponse;
  @Input() isSubmittingMeasurements = false;
  @Output() submitMeasurements = new EventEmitter<SubmitMeasurementsPayload>();

  constructor(private readonly dialog: MatDialog) {}

  openMoreInfoDialog(): void {
    this.dialog.open(RunMoreInfoDialog, {
      data: this.run,
      width: '500px',
    });
  }

  onSubmitMeasurements(payload: SubmitMeasurementsPayload): void {
    this.submitMeasurements.emit(payload);
  }
}
