import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { finalize } from 'rxjs/operators';

import { RunsApi } from '../../core/api/runs.api';
import { InstrumentRunListItem } from '../../core/api/api-types';

@Component({
  selector: 'app-view-runs',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './view-runs.html',
  styleUrl: './view-runs.scss',
})
export class ViewRuns implements OnInit, AfterViewInit {
  readonly displayedColumns: string[] = [
    'actions',
    'id',
    'externalReference',
    'status',
    'createdAt',
  ];

  dataSource = new MatTableDataSource<InstrumentRunListItem>([]);
  isLoading = false;
  loadError: string | null = null;

  @ViewChild(MatSort) private sort!: MatSort;

  constructor(
    private readonly runsApi: RunsApi,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadRuns();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadRuns(): void {
    this.isLoading = true;
    this.loadError = null;
    this.cdr.markForCheck();

    this.runsApi.getAllRuns()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (runs) => {
          this.dataSource.data = runs;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load runs:', err);
          this.loadError = 'Failed to load runs. Please try again.';
          this.cdr.markForCheck();
        },
      });
  }

  onViewRun(runId: number): void {
    this.router.navigate(['/runs', runId]);
  }
}
