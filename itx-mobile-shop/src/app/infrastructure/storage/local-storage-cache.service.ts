import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageCacheService {
  private readonly prefix = 'cache:';
  private readonly defaultTtl = 3600 * 1000;

  set<T>(key: string, data: T, ttl: number = this.defaultTtl): void {
    const expires = Date.now() + ttl;
    const value = JSON.stringify({ expires, data });
    localStorage.setItem(this.prefix + key, value);
  }

  get<T>(key: string): T | null {
    const cacheSaved = localStorage.getItem(this.prefix + key);
    if (!cacheSaved) return null;

    try {
      const { expires, data } = JSON.parse(cacheSaved);
      if (Date.now() > expires) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }
      return data;
    } catch {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}
