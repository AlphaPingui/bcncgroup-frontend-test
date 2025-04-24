import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductDetail } from '../../domain/models/product.model';
import { environment } from '../../../environments/environment';

const API_BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {
  private http = inject(HttpClient);

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE_URL}/product`);
  }

  getById(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${API_BASE_URL}/product/${id}`);
  }
}
