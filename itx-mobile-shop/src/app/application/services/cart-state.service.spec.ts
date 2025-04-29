import { TestBed } from '@angular/core/testing';
import { CartStateService } from './cart-state.service';
import { LocalStorageCacheService } from '../../infrastructure/storage/local-storage-cache.service';

describe('CartStateService', () => {
    let service: CartStateService;
    let localStorageCacheSpy: jasmine.SpyObj<LocalStorageCacheService>;

    const CART_COUNT_KEY = 'cart-total-count';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CartStateService,
                {
                    provide: LocalStorageCacheService,
                    useValue: jasmine.createSpyObj('LocalStorageCacheService', ['get', 'set'])
                }
            ]
        });

        service = TestBed.inject(CartStateService);
        localStorageCacheSpy = TestBed.inject(LocalStorageCacheService) as jasmine.SpyObj<LocalStorageCacheService>;
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize total from local storage if a number is stored', () => {
        localStorageCacheSpy.get.and.returnValue(5);

        const newService = new CartStateService(localStorageCacheSpy);

        expect(newService.total()).toBe(5);
    });

    it('should keep total as 0 if local storage does not have a number', () => {
        localStorageCacheSpy.get.and.returnValue(null);

        const newService = new CartStateService(localStorageCacheSpy);

        expect(newService.total()).toBe(0);
    });

    it('should increment total and update local storage', () => {
        service.increment();

        expect(service.total()).toBe(1);
        expect(localStorageCacheSpy.set).toHaveBeenCalledWith(CART_COUNT_KEY, 1);
    });
});
