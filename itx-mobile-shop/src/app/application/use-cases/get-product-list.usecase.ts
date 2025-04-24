import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductApiService } from '../../infrastructure/http/product-api.service';
import { LocalStorageCacheService } from '../../infrastructure/storage/local-storage-cache.service';

export class GetProductListUseCase {
  private readonly cacheKey = 'product-list';
  private readonly api = inject(ProductApiService);
  private readonly cache = inject(LocalStorageCacheService);

  execute(): Observable<Product[]> {
    const cached = this.cache.get<Product[]>(this.cacheKey);
    if (cached) {
      return of(cached);
    }

    return new Observable<Product[]>((observer) => {
      this.api.getAll().subscribe({
        next: (products) => {
          this.cache.set(this.cacheKey, products);
          observer.next(products);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
