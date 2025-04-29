import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CartStateService } from '../../../application/services/cart-state.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;

    const MOCK_CART_STATE = {
        total: signal(1)
    };

    const MOCK_ROUTER = {
        url: '/product/ZmGrkLRPXOTpxsU4jjAcv',
        events: { subscribe: (cb: any) => cb() },
        getCurrentNavigation: () => ({
            extras: {
                state: { brand: 'Acer', model: 'Iconia Talk S' }
            }
        })
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                { provide: CartStateService, useValue: MOCK_CART_STATE },
                { provide: Router, useValue: MOCK_ROUTER }
            ]
        });

        fixture = TestBed.createComponent(HeaderComponent);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should show the site title link', () => {
        const link = fixture.debugElement.query(By.css('a[routerLink="/"]'));
        expect(link.nativeElement.textContent).toContain('ITX Mobile Shop');
    });

    it('should display product brand and model in breadcrumb', () => {
        const crumb = fixture.debugElement.query(By.css('[aria-current="page"]'));
        expect(crumb.nativeElement.textContent).toContain('Acer Iconia Talk S');
    });

    it('should show cart total when cart has items', () => {
        const badge = fixture.debugElement.query(By.css('span.bg-black'));
        expect(badge.nativeElement.textContent.trim()).toBe('1');
    });

    it('should not show cart badge when total is 0', () => {
        MOCK_CART_STATE.total.set(0);
        fixture.detectChanges();
        const badge = fixture.debugElement.query(By.css('span.bg-black'));
        expect(badge).toBeNull();
    });
});
