import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientIdService {
  private readonly storageKey = 'client_id';
  private cached?: string;

  /** Returns the persisted client id or creates one and persists it. */
  getClientId(): string {
    if (this.cached) return this.cached;

    const existing = this.safeGet(this.storageKey);
    if (existing) {
      this.cached = existing;
      return existing;
    }

    const created = this.createUuid();
    this.safeSet(this.storageKey, created);
    this.cached = created;
    return created;
  }

  private safeGet(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeSet(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore (private mode, blocked storage, etc.)
    }
  }

  private createUuid(): string {
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
