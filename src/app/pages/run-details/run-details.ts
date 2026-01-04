import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RunConfiguration} from './run-configuration/run-configuration';
import {RunSummary} from './run-summary/run-summary';

@Component({
  selector: 'app-run-details',
  standalone: true,
  imports: [RunConfiguration, RunSummary],
  templateUrl: './run-details.html',
  styleUrl: './run-details.scss',
})
export class RunDetails {
  readonly runId: string | null;

  constructor(private readonly route: ActivatedRoute) {
    this.runId = this.route.snapshot.paramMap.get('runId');
  }
}
