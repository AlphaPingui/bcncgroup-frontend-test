import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CartStateService } from '../../../application/services/cart-state.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let cartState: { cartCount: ReturnType<typeof signal<number>> };

    beforeEach(() => {
        cartState = { cartCount: signal(1) };

        TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                provideRouter([]),
                { provide: CartStateService, useValue: cartState }
            ]
        });

        fixture = TestBed.createComponent(HeaderComponent);
        Object.defineProperty(fixture.componentInstance, 'productTitle', { value: signal('Acer Iconia Talk S') });
        Object.defineProperty(fixture.componentInstance, 'cartTotal', { value: cartState.cartCount });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should show site title link', () => {
        const link = fixture.debugElement.query(By.css('a[routerLink="/"]'));
        expect(link.nativeElement.textContent).toContain('ITX Mobile Shop');
    });

    it('should display product title in breadcrumb', () => {
        const crumb = fixture.debugElement.query(By.css('[aria-current="page"]'));
        expect(crumb.nativeElement.textContent).toContain('Acer Iconia Talk S');
    });

    it('should show cart badge with count', () => {
        const badge = fixture.debugElement.query(By.css('span.bg-black'));
        expect(badge).not.toBeNull();
        expect(badge.nativeElement.textContent.trim()).toBe('1');
    });

    it('should hide cart badge when empty', () => {
        cartState.cartCount.set(0);
        fixture.detectChanges();
        const badge = fixture.debugElement.query(By.css('span.bg-black'));
        expect(badge).toBeNull();
    });
});