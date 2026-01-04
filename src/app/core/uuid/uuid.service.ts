import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UuidService {
  generateUUID(): string {
    // Modern browsers
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    // Fallback (RFC4122-ish v4)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
