import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentRunResponse } from '../../../core/api/api-types';

@Component({
  selector: 'app-run-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './run-summary.html',
  styleUrl: './run-summary.scss',
})
export class RunSummary {
  @Input({ required: true }) run!: InstrumentRunResponse;
}
