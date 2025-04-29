import { TestBed } from '@angular/core/testing';
import { CartApiService } from './cart-api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('CartApiService', () => {
    let service: CartApiService;
    let httpMock: HttpTestingController;

    const MOCK_ADD_TO_CART_PAYLOAD = {
        "id": "8hKbH2UHPM_944nRHYN1n",
        "colorCode": 1000,
        "storageCode": 2000
    };

    const MOCK_ADD_TO_CART_RESPONSE = {
        count: 1
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CartApiService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(CartApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should add item to cart', () => {
        service.addToCart(MOCK_ADD_TO_CART_PAYLOAD).subscribe(response => {
            expect(response).toEqual(MOCK_ADD_TO_CART_RESPONSE);
        });

        const req = httpMock.expectOne(`${environment.apiBaseUrl}/cart`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(MOCK_ADD_TO_CART_PAYLOAD);
        req.flush(MOCK_ADD_TO_CART_RESPONSE);
    });
});
