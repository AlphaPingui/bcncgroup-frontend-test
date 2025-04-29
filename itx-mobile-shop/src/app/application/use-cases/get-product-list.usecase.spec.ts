import { TestBed } from '@angular/core/testing';
import { GetProductListUseCase } from './get-product-list.usecase';
import { ProductApiService } from '../../infrastructure/http/product-api.service';
import { LocalStorageCacheService } from '../../infrastructure/storage/local-storage-cache.service';
import { of } from 'rxjs';

describe('GetProductListUseCase', () => {
    let useCase: GetProductListUseCase;
    let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
    let localStorageCacheServiceSpy: jasmine.SpyObj<LocalStorageCacheService>;

    const MOCK_PRODUCT = [
        { id: 'cGjFJlmqNPIwU59AOcY8L', brand: 'Apple', model: 'iPhone 14', imgUrl: 'url3.jpg', price: 300 }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GetProductListUseCase,
                {
                    provide: ProductApiService,
                    useValue: jasmine.createSpyObj('ProductApiService', ['getAll'])
                },
                {
                    provide: LocalStorageCacheService,
                    useValue: jasmine.createSpyObj('LocalStorageCacheService', ['get', 'set'])
                }
            ]
        });

        useCase = TestBed.inject(GetProductListUseCase);
        productApiServiceSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
        localStorageCacheServiceSpy = TestBed.inject(LocalStorageCacheService) as jasmine.SpyObj<LocalStorageCacheService>;
    });

    it('should create the use case', () => {
        expect(useCase).toBeTruthy();
    });

    it('should return products from cache if available', (done) => {
        localStorageCacheServiceSpy.get.and.returnValue(MOCK_PRODUCT);

        useCase.execute().subscribe((products) => {
            expect(products).toEqual(MOCK_PRODUCT);
            expect(productApiServiceSpy.getAll).not.toHaveBeenCalled();
            done();
        });
    });

    it('should call API if no cache is available', (done) => {
        localStorageCacheServiceSpy.get.and.returnValue(null);
        productApiServiceSpy.getAll.and.returnValue(of(MOCK_PRODUCT));

        useCase.execute().subscribe((products) => {
            expect(products).toEqual(MOCK_PRODUCT);
            expect(productApiServiceSpy.getAll).toHaveBeenCalled();
            done();
        });
    });

    it('should set cache after fetching from API', (done) => {
        localStorageCacheServiceSpy.get.and.returnValue(null);
        productApiServiceSpy.getAll.and.returnValue(of(MOCK_PRODUCT));

        useCase.execute().subscribe(() => {
            expect(localStorageCacheServiceSpy.set).toHaveBeenCalledWith('product-list', MOCK_PRODUCT);
            done();
        });
    });
});
