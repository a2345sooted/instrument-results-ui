import { Injectable } from '@angular/core';
import { UuidService } from '../uuid/uuid.service';

@Injectable({ providedIn: 'root' })
export class ClientIdService {
  private readonly storageKey = 'client_id';
  private cached?: string;

  constructor(private readonly uuidService: UuidService) {}

  /** Returns the persisted client id or creates one and persists it. */
  getClientId(): string {
    if (this.cached) {
      return this.cached;
    }

    const existing = this.safeGet(this.storageKey);
    if (existing) {
      this.cached = existing;
      return existing;
    }

    const created = this.uuidService.generateUUID();
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
}
