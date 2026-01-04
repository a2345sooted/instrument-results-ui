import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-instrument-section',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './instrument-section.html',
  styleUrl: './instrument-section.scss',
})
export class InstrumentSection {}
