import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../ui/components/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
  imports: [CommonModule, ProductCardComponent]
})

export class ProductListPageComponent {}
