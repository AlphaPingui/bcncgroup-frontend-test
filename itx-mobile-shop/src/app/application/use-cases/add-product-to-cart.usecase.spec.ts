import { TestBed } from '@angular/core/testing';
import { AddProductToCartUseCase } from './add-product-to-cart.usecase';
import { CartApiService } from '../../infrastructure/http/cart-api.service';
import { of } from 'rxjs';
import { AddToCartPayload, CartResponse } from '../../domain/models/cart.model';

describe('AddProductToCartUseCase', () => {
    let useCase: AddProductToCartUseCase;
    let cartApiServiceSpy: jasmine.SpyObj<CartApiService>;

    const MOCK_PAYLOAD: AddToCartPayload = {
        id: 'abc123',
        colorCode: 1,
        storageCode: 2
    };

    const MOCK_RESPONSE: CartResponse = {
        count: 1
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AddProductToCartUseCase,
                {
                    provide: CartApiService,
                    useValue: jasmine.createSpyObj('CartApiService', ['addToCart'])
                }
            ]
        });

        useCase = TestBed.inject(AddProductToCartUseCase);
        cartApiServiceSpy = TestBed.inject(CartApiService) as jasmine.SpyObj<CartApiService>;
    });

    it('should create the use case', () => {
        expect(useCase).toBeTruthy();
    });

    it('should call CartApiService.addToCart with correct payload and return response', (done) => {
        cartApiServiceSpy.addToCart.and.returnValue(of(MOCK_RESPONSE));

        useCase.execute(MOCK_PAYLOAD).subscribe(response => {
            expect(cartApiServiceSpy.addToCart).toHaveBeenCalledWith(MOCK_PAYLOAD);
            expect(response).toEqual(MOCK_RESPONSE);
            done();
        });
    });
});
