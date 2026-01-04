import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InstrumentRunResponse } from '../../../core/api/api-types';

@Component({
  selector: 'app-measurements-section',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, // 👈 required for mat-raised-button
  ],
  templateUrl: './measurements-section.html',
  styleUrl: './measurements-section.scss',
})
export class MeasurementsSection {
  @Input({ required: true }) run!: InstrumentRunResponse;

  // Allow: digits, one dot, optional leading minus
  private readonly allowedChar = /^[0-9.\-]$/;

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

  onBeforeInput(event: InputEvent): void {
    if (event.inputType?.startsWith('delete')) return;
    if (!event.data) return;

    if (!this.allowedChar.test(event.data)) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const nextValue =
      target.value.slice(0, target.selectionStart ?? target.value.length) +
      event.data +
      target.value.slice(target.selectionEnd ?? target.value.length);

    if (!this.isValidNumericString(nextValue)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') ?? '';
    if (!this.isValidNumericString(text.trim())) {
      event.preventDefault();
    }
  }

  private isValidNumericString(value: string): boolean {
    if (value === '') return true;
    if (value === '-') return true;
    if (/^-?\d+\.$/.test(value)) return true;
    return /^-?\d*(\.\d*)?$/.test(value);
  }
}
