import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListPageComponent } from './product-list-page.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductListPageComponent', () => {
    let component: ProductListPageComponent;
    let fixture: ComponentFixture<ProductListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductListPageComponent],
            providers: [
                provideRouter([]),
                provideHttpClient(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({}),
                        snapshot: { paramMap: { get: () => null } }
                    }
                }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a list of products', () => {
        spyOn(component, 'filteredProducts').and.returnValue([
            { id: 'cGjFJlmqNPIwU59AOcY8H', brand: 'Acer', model: 'Liquid 1', imgUrl: 'url1.jpg', price: 100 },
            { id: 'cGjFJlmqNPIwU59AOcY8J', brand: 'Acer', model: 'Liquid 2', imgUrl: 'url2.jpg', price: 200 }
        ]);

        fixture.detectChanges();

        const productCards = fixture.debugElement.queryAll(By.css('app-product-card'));

        expect(productCards.length).toBe(2);
    });

    it('should update searchTerm when user types in search input', () => {
        const inputElement = fixture.debugElement.query(By.css('input[name="search"]')).nativeElement;
      
        inputElement.value = 'iphone';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
      
        expect(component.searchTerm()).toBe('iphone');
      });
      
      it('should filter products based on searchTerm', () => {
        const mockProducts = [
            { id: 'cGjFJlmqNPIwU59AOcY8H', brand: 'Acer', model: 'Liquid 1', imgUrl: 'url1.jpg', price: 100 },
            { id: 'cGjFJlmqNPIwU59AOcY8J', brand: 'Acer', model: 'Liquid 2', imgUrl: 'url2.jpg', price: 200 },
            { id: 'cGjFJlmqNPIwU59AOcY8L', brand: 'Apple', model: 'iPhone 14', imgUrl: 'url3.jpg', price: 300 }
        ];
      
        component.products.set(mockProducts);
        component.searchTerm.set('iphone');
        fixture.detectChanges();
      
        const filtered = component.filteredProducts();
      
        expect(filtered.length).toBe(1);
        expect(filtered[0].model).toBe('iPhone 14');
      });
      
});
