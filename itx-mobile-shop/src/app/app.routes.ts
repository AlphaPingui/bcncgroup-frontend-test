import { Routes } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductListPageComponent
    },
    {
        path: 'product/:id',
        loadComponent: () =>
          import('./pages/product-detail-page/product-detail-page.component')
            .then(m => m.ProductDetailPageComponent)
    }
];
