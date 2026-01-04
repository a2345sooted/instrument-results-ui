import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';

import {API_BASE_URL} from './api-base-url.token';
import {
  CreateInstrumentRunRequest,
  Instrument,
  InstrumentRunListItem,
  InstrumentRunResponse,
  SubmitMeasurementsPayload
} from './api-types';

@Injectable({
  providedIn: 'root',
})
export class RunsApi {
  constructor(
      private readonly http: HttpClient,
      @Inject(API_BASE_URL) private readonly baseUrl: string
  ) {}

  getInstruments(): Observable<Instrument[]> {
    return this.http
        .get<Instrument[]>(`${this.baseUrl}/instruments`)
        .pipe(
            timeout(5000),
            catchError((err) => throwError(() => err))
        );
  }

  /**
   * GET /api/v1/instrument-runs
   */
  getAllRuns(): Observable<InstrumentRunListItem[]> {
    return this.http
        .get<InstrumentRunListItem[]>(`${this.baseUrl}/instrument-runs`)
        .pipe(
            timeout(8000),
            catchError((err) => throwError(() => err))
        );
  }

  createInstrumentRun(
      body: CreateInstrumentRunRequest
  ): Observable<InstrumentRunResponse> {
    return this.http
        .post<InstrumentRunResponse>(`${this.baseUrl}/instrument-runs`, body)
        .pipe(
            timeout(8000),
            catchError((err) => throwError(() => err))
        );
  }

  /**
   * GET /api/v1/instrument-runs/:id
   */
  getInstrumentRunById(
      id: number | string
  ): Observable<InstrumentRunResponse> {
    const encodedId = this.validateAndEncodeRunId(id);

    return this.http
        .get<InstrumentRunResponse>(
            `${this.baseUrl}/instrument-runs/${encodedId}`
        )
        .pipe(
            timeout(8000),
            catchError((err) => throwError(() => err))
        );
  }

  /**
   * POST /api/v1/instrument-runs/:id/measurements
   */
  submitMeasurements(
      id: number | string,
      body: SubmitMeasurementsPayload
  ): Observable<InstrumentRunResponse> {
    const encodedId = this.validateAndEncodeRunId(id);

    return this.http
        .post<InstrumentRunResponse>(
            `${this.baseUrl}/instrument-runs/${encodedId}/measurements`,
            body
        )
        .pipe(
            timeout(8000),
            catchError((err) => throwError(() => err))
        );
  }

  /**
   * Validates and encodes an instrument run ID for use in API URLs
   */
  private validateAndEncodeRunId(id: number | string): string {
    const parsedId =
        typeof id === 'string'
            ? Number(id)
            : id;

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      throw new Error(`Invalid instrument run id: ${id}`);
    }

    return encodeURIComponent(String(parsedId));
  }
}
