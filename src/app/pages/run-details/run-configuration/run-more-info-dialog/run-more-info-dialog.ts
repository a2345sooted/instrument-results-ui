import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InstrumentRunResponse } from '../../../../core/api/api-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-run-more-info-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './run-more-info-dialog.html',
  styleUrl: './run-more-info-dialog.scss',
})
export class RunMoreInfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public run: InstrumentRunResponse) {}

  formatCreatedDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }
}
