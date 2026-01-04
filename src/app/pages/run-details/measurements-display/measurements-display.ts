import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentRunResponse } from '../../../core/api/api-types';

@Component({
  selector: 'app-measurements-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './measurements-display.html',
  styleUrl: './measurements-display.scss',
})
export class MeasurementsDisplay {
  @Input({ required: true }) run!: InstrumentRunResponse;

  formatSubmittedDate(dateString: string): string {
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
