import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AddToCartPayload {
  id: string;
  colorCode: string;
  storageCode: string;
}

interface AddToCartResponse {
  count: number;
}

const API_BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})

export class CartApiService {
  private http = inject(HttpClient);

  addToCart(payload: AddToCartPayload): Observable<AddToCartResponse> {
    return this.http.post<AddToCartResponse>(`${API_BASE_URL}/cart`, payload);
  }
}
