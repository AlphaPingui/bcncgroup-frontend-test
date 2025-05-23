import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [CommonModule, RouterModule]
})

export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
