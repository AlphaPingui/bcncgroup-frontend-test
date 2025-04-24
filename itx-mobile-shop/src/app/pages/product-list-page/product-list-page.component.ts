import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../ui/components/product-card/product-card.component';
import { GetProductListUseCase } from '../../application/use-cases/get-product-list.usecase';
import { Product } from '../../domain/models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
  imports: [CommonModule, ProductCardComponent],
  providers: [GetProductListUseCase]
})

export class ProductListPageComponent {
  private readonly getProductList = inject(GetProductListUseCase);
  readonly products = signal<Product[]>([]);
  readonly searchTerm = signal('');

  readonly filteredProducts = computed(() =>
    this.products().filter((product) =>
      `${product.model} ${product.brand}`
        .trim()
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    )
  );

  constructor() {
    effect(() => {
      this.getProductList.execute().subscribe({
        next: (data) => this.products.set(data),
        error: (err) => console.error('Error cargando productos', err)
      });
    });
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
