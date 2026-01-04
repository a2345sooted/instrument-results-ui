import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';

import {API_BASE_URL} from './api-base-url.token';
import {CreateInstrumentRunRequest, Instrument, InstrumentRunResponse} from './api-types';

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

    const parsedId =
      typeof id === 'string'
        ? Number(id)
        : id;

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      throw new Error(`Invalid instrument run id: ${id}`);
    }

    const encodedId = encodeURIComponent(String(parsedId));

    return this.http
      .get<InstrumentRunResponse>(
        `${this.baseUrl}/instrument-runs/${encodedId}`
      )
      .pipe(
        timeout(8000),
        catchError((err) => throwError(() => err))
      );
  }
}
