import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../ui/components/product-card/product-card.component';
import { GetProductListUseCase } from '../../application/use-cases/get-product-list.usecase';
import { Product } from '../../domain/models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
  imports: [CommonModule, ProductCardComponent]
})

export class ProductListPageComponent {
  private readonly getProductList = inject(GetProductListUseCase);
  readonly products = signal<Product[]>([]);

  constructor() {
    effect(() => {
      this.getProductList.execute().subscribe({
        next: (data) => this.products.set(data),
        error: (err) => console.error('Error cargando productos', err)
      });
    });
  }
}
