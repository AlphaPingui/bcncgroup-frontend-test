import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CartStateService } from '../../../application/services/cart-state.service';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    const routerEvents$ = new Subject<NavigationEnd>();

    const MOCK_CART_STATE = {
        total: signal(1)
    };

    const MOCK_ROUTER = {
        url: '/product/ZmGrkLRPXOTpxsU4jjAcv',
        events: routerEvents$.asObservable(),
        getCurrentNavigation: (): { extras: NavigationExtras } => ({
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

        routerEvents$.next(new NavigationEnd(1, '/', MOCK_ROUTER.url));
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
