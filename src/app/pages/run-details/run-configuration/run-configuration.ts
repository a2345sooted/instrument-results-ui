import { Component } from '@angular/core';
import { InstrumentSection } from '../instrument-section/instrument-section';
import { MeasurementsSection } from '../measurements-section/measurements-section';

@Component({
  selector: 'app-run-configuration',
  standalone: true,
  imports: [InstrumentSection, MeasurementsSection],
  templateUrl: './run-configuration.html',
  styleUrl: './run-configuration.scss',
})
export class RunConfiguration {}
