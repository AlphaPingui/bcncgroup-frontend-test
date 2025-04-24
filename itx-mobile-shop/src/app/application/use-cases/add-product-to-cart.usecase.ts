import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartApiService } from '../../infrastructure/http/cart-api.service';
import { AddToCartPayload, CartResponse } from '../../domain/models/cart.model';

export class AddProductToCartUseCase {
  private readonly api = inject(CartApiService);

  execute(payload: AddToCartPayload): Observable<CartResponse> {
    return this.api.addToCart(payload);
  }
}
