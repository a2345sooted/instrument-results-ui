/**
 * Shared DTO/type definitions for the API layer.
 * Keep this file framework-agnostic (no Angular imports).
 */

export interface Instrument {
  id: number;
  code: string;
  name: string;
}

export interface CreateInstrumentRunRequest {
  instrumentCode: string;
  externalReference?: string;
}

export type InstrumentRunStatus =
    | 'CREATED'
    | 'MEASUREMENTS_SUBMITTED'
    | 'PROCESSING'
    | 'SUCCEEDED'
    | 'FAILED'
    // forward-compat if backend adds new statuses
    | (string & {});

export interface RequiredMeasurementResponse {
  code: string;
  name: string;
  unit: string;
  displayOrder: number;

  /**
   * Optional:
   * - omitted if not submitted yet
   * - may be null depending on backend serialization
   *
   * NOTE: If BigDecimal precision matters, consider modeling this as `string`
   * end-to-end to avoid JS float rounding.
   */
  submittedValue?: number | null;
}

export interface ProcessResult {
  result: string;
}

export interface InstrumentRunResponse {
  id: number;

  instrumentCode: string;
  instrumentName: string;

  createdByClientId: string;
  externalReference: string | null;

  status: InstrumentRunStatus;

  measurementsSubmittedAt: string | null;
  measurementsSubmittedByClientId: string | null;

  processingStartedAt: string | null;
  processingCompletedAt: string | null;

  errorCode: string | null;
  errorMessage: string | null;

  processResult: ProcessResult | null;

  createdAt: string;
  updatedAt: string;

  requiredMeasurements: RequiredMeasurementResponse[];
}


export interface SubmitMeasurementsPayload {
  measurements: { [key: string]: number };
}
