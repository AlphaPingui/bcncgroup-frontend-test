import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductDetail } from '../../domain/models/product.model';
import { ProductApiService } from '../../infrastructure/http/product-api.service';
import { LocalStorageCacheService } from '../../infrastructure/storage/local-storage-cache.service';

export class GetProductDetailUseCase {
  private readonly api = inject(ProductApiService);
  private readonly cache = inject(LocalStorageCacheService);

  execute(productId: string): Observable<ProductDetail> {
    const cacheKey = `product-detail-${productId}`;
    const cached = this.cache.get<ProductDetail>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return new Observable<ProductDetail>((observer) => {
      this.api.getById(productId).subscribe({
        next: (detail) => {
          this.cache.set(cacheKey, detail);
          observer.next(detail);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
