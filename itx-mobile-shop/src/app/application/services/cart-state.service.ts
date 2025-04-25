import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { LocalStorageCacheService } from '../../infrastructure/storage/local-storage-cache.service';

const CART_COUNT_KEY = 'cart-total-count';

@Injectable({ providedIn: 'root' })
export class CartStateService {
  readonly total = signal<number>(0);

  constructor(private readonly localStorage: LocalStorageCacheService) {
    const stored = this.localStorage.get<number>(CART_COUNT_KEY);
    if (typeof stored === 'number') {
      this.total.set(stored);
    }
  }

  increment(): void {
    const updated = this.total() + 1;
    this.total.set(updated);
    this.localStorage.set(CART_COUNT_KEY, updated);
  }
}
