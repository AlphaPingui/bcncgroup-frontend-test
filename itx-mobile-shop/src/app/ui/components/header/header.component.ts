import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartStateService } from '../../../application/services/cart-state.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  private readonly cartState = inject(CartStateService);
  private readonly router = inject(Router);

  readonly cartTotal = this.cartState.total;
  readonly productTitle = signal<string | null>(null);

  constructor() {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.startsWith('/product/')) {
        const state = this.router.getCurrentNavigation()?.extras?.state as { brand: string; model: string } | undefined;
        if (state) {
          this.productTitle.set(`${state.brand} ${state.model}`);
        }
      } else {
        this.productTitle.set(null);
      }
    });
  }
}
