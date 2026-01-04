import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { API_BASE_URL } from './api-base-url.token';

export interface Instrument {
  id: number;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class RunsApi {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) {}

  getInstruments(): Observable<Instrument[]> {
    return this.http
      .get<Instrument[]>(`${this.baseUrl}/instruments`)
      .pipe(
        timeout(2000),
        catchError((err) => {
          // Let the component decide how to display; we just ensure it errors in finite time.
          return throwError(() => err);
        })
      );
  }
}
