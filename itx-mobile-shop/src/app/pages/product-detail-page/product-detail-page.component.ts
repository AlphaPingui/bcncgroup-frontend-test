import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetProductDetailUseCase } from '../../application/use-cases/get-product-detail.usecase';
import { RouterModule } from '@angular/router';
import { ProductDetail } from '../../domain/models/product.model';
import { AddProductToCartUseCase } from '../../application/use-cases/add-product-to-cart.usecase';
import { CartStateService } from '../../application/services/cart-state.service';

@Component({
  standalone: true,
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
  imports: [CommonModule, RouterModule],
  providers: [GetProductDetailUseCase, AddProductToCartUseCase]
})

export class ProductDetailPageComponent {
  private readonly getDetail = inject(GetProductDetailUseCase);
  private readonly route = inject(ActivatedRoute);
  private readonly AddProductToCart = inject(AddProductToCartUseCase);
  private readonly cartState = inject(CartStateService);

  readonly product = signal<ProductDetail | null>(null);
  readonly selectedStorage = signal<number | null>(null);
  readonly selectedColor = signal<number | null>(null);
  readonly addedToCart = signal(false);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.getDetail.execute(id).subscribe({
          next: (detail) => this.product.set(this.sanitizeDetail(detail)),
          error: (err) => console.error('Error cargando detalle', err)
        });
      }
    });
  }

  private normalizeToArray(value: unknown, fallback: string[] = ['No disponible']): string[] {
    if (Array.isArray(value)) {
      return value.map((v) => String(v).trim()).filter(Boolean);
    }

    if (typeof value === 'string' && value.trim()) {
      return [value.trim()];
    }

    return fallback;
  }


  private sanitizeDetail(detail: ProductDetail): ProductDetail {
    const sanitized = {
      ...detail,
      wlan: this.normalizeToArray(detail.wlan),
      bluetooth: this.normalizeToArray(detail.bluetooth),
      primaryCamera: this.normalizeToArray(detail.primaryCamera),
      secondaryCmera: this.normalizeToArray(detail.secondaryCmera),
      sensors: this.normalizeToArray(detail.sensors),
      internalMemory: this.normalizeToArray(detail.internalMemory),
      sim: this.normalizeToArray(detail.sim)[0],
      usb: this.normalizeToArray(detail.usb)[0],
      nfc: this.normalizeToArray(detail.nfc)[0],
      status: this.normalizeToArray(detail.status)[0],
      announced: this.normalizeToArray(detail.announced)[0],
      dimentions: this.normalizeToArray(detail.dimentions)[0],
      weight: this.normalizeToArray(detail.weight)[0],
      audioJack: this.normalizeToArray(detail.audioJack)[0],
      speaker: this.normalizeToArray(detail.speaker)[0],
      radio: this.normalizeToArray(detail.radio)[0],
      gps: this.normalizeToArray(detail.gps)[0],
      externalMemory: String(detail.externalMemory || '').trim() || 'No disponible',
      ram: String(detail.ram || '').trim() || 'No disponible',
      chipset: String(detail.chipset || '').trim() || 'No disponible',
      gpu: String(detail.gpu || '').trim() || 'No disponible',
      battery: String(detail.battery || '').trim() || 'No disponible',
      os: String(detail.os || '').trim() || 'No disponible',
      cpu: String(detail.cpu || '').trim() || 'No disponible',
      displayResolution: String(detail.displayResolution || '').trim() || 'No disponible',
      displaySize: String(detail.displaySize || '').trim() || 'No disponible',
      displayType: String(detail.displayType || '').trim() || 'No disponible',
      price: detail.price || 'N/D',
      options: detail.options ?? { colors: [], storages: [] }
    };

    if (sanitized.options.colors.length > 0) {
      this.selectedColor.set(Number(sanitized.options.colors[0].code));
    }

    if (sanitized.options.storages.length > 0) {
      this.selectedStorage.set(Number(sanitized.options.storages[0].code));
    }

    return sanitized;
  }

  handleStorageChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStorage.set(Number(value));
  }

  handleColorChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedColor.set(Number(value));
  }


  addToCart(id: string): void {
    const colorCode = this.selectedColor();
    const storageCode = this.selectedStorage();

    if (!colorCode || !storageCode) return;

    this.AddProductToCart.execute({ id, colorCode, storageCode }).subscribe({
      next: () => {
        this.cartState.increment();
        this.addedToCart.set(true);
        setTimeout(() => this.addedToCart.set(false), 3000);
      },
      error: (error) => {
        console.error('Error al añadir al carrito:', error);
      }
    });
  }

}
