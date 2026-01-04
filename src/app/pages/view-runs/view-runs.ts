import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type RunRow = {
  runId: string;
  clientId: string;
  externalRefId?: string;
  status: 'CREATED' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdAt: string; // ISO string for now
  updatedAt: string; // ISO string for now
};

@Component({
  selector: 'app-view-runs',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './view-runs.html',
  styleUrl: './view-runs.scss',
})
export class ViewRuns implements AfterViewInit {
  readonly displayedColumns: Array<keyof RunRow> = [
    'runId',
    'clientId',
    'externalRefId',
    'status',
    'createdAt',
    'updatedAt',
  ];

  readonly dataSource = new MatTableDataSource<RunRow>([
    {
      runId: 'run-001',
      clientId: '550e8400-e29b-41d4-a716-446655440000',
      externalRefId: 'EXT-123',
      status: 'COMPLETED',
      createdAt: '2026-01-01T14:22:00Z',
      updatedAt: '2026-01-01T15:10:00Z',
    },
    {
      runId: 'run-002',
      clientId: '550e8400-e29b-41d4-a716-446655440000',
      externalRefId: 'EXT-456',
      status: 'RUNNING',
      createdAt: '2026-01-02T09:05:00Z',
      updatedAt: '2026-01-02T09:42:00Z',
    },
    {
      runId: 'run-003',
      clientId: '0f5d7a7a-11aa-4b3c-bc5a-7c2e2f9b1c4a',
      externalRefId: '',
      status: 'FAILED',
      createdAt: '2026-01-02T10:12:00Z',
      updatedAt: '2026-01-02T10:19:00Z',
    },
  ]);

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngAfterViewInit(): void {
    // “docs-style” wiring
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Basic global filter (we’ll replace later with your column filter popup UI)
  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();

    // If filtering shrinks results, reset to first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
