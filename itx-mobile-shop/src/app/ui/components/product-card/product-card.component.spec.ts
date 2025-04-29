import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Product } from '../../../domain/models/product.model';

describe('ProductCardComponent', () => {
    let fixture: ComponentFixture<ProductCardComponent>;

    const MOCK_PRODUCT: Product = {
        id: 'ZmGrkLRPXOTpxsU4jjAcv',
        brand: 'Acer',
        model: 'Iconia Talk S',
        price: 170,
        imgUrl: 'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ProductCardComponent],
            providers: [provideRouter([])]
        });

        fixture = TestBed.createComponent(ProductCardComponent);
        fixture.componentInstance.product = MOCK_PRODUCT;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render product details correctly', () => {
        const img = fixture.debugElement.query(By.css('img'));
        const model = fixture.debugElement.query(By.css('h3'));
        const brand = fixture.debugElement.query(By.css('p.text-sm'));
        const price = fixture.debugElement.query(By.css('p.text-base'));

        expect(img.nativeElement.src).toContain(MOCK_PRODUCT.imgUrl);
        expect(img.nativeElement.alt).toBe(MOCK_PRODUCT.model);
        expect(model.nativeElement.textContent).toContain(MOCK_PRODUCT.model);
        expect(brand.nativeElement.textContent).toContain(MOCK_PRODUCT.brand);
        expect(price.nativeElement.textContent).toContain('€');
    });

    it('should have a link to the product detail page', () => {
        const link = fixture.debugElement.query(By.css('a'));
        expect(link.attributes['ng-reflect-router-link']).toContain('/product/ZmGrkLRPXOTpxsU4jjAcv');
        expect(link.attributes['ng-reflect-state']).toContain('brand:Acer');
        expect(link.attributes['ng-reflect-state']).toContain('model:Iconia Talk S');
    });
});
