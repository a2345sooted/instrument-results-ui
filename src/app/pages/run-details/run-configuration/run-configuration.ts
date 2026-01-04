import { Component, Input } from '@angular/core';
import { MeasurementsSection } from '../measurements-section/measurements-section';
import { InstrumentRunResponse } from '../../../core/api/api-types';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RunMoreInfoDialog } from './run-more-info-dialog/run-more-info-dialog';

@Component({
  selector: 'app-run-configuration',
  standalone: true,
  imports: [MeasurementsSection, MatButtonModule, MatDialogModule],
  templateUrl: './run-configuration.html',
  styleUrl: './run-configuration.scss',
})
export class RunConfiguration {
  @Input({ required: true }) run!: InstrumentRunResponse;

  constructor(private readonly dialog: MatDialog) {}

  openMoreInfoDialog(): void {
    this.dialog.open(RunMoreInfoDialog, {
      data: this.run,
      width: '500px',
    });
  }
}
