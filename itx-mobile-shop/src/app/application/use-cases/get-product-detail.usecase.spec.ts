import { TestBed } from '@angular/core/testing';
import { GetProductDetailUseCase } from './get-product-detail.usecase';
import { ProductApiService } from '../../infrastructure/http/product-api.service';
import { LocalStorageCacheService } from '../../infrastructure/storage/local-storage-cache.service';
import { of } from 'rxjs';
import { ProductDetail } from '../../domain/models/product.model';

describe('GetProductDetailUseCase', () => {
    let useCase: GetProductDetailUseCase;
    let productApiSpy: jasmine.SpyObj<ProductApiService>;
    let localStorageSpy: jasmine.SpyObj<LocalStorageCacheService>;

    const MOCK_PRODUCT_DETAIL: ProductDetail = {
        id: '8hKbH2UHPM_944nRHYN1n',
        brand: 'Acer',
        model: 'Liquid Z6',
        price: 120,
        imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg',
        networkTechnology: "GSM / HSPA / LTE",
        networkSpeed: "HSPA  LTE",
        gprs: "Yes",
        edge: "Yes",
        announced: "2016  August",
        status: "Available. Released 2016  December",
        dimentions: "-",
        weight: "",
        sim: "Single SIM (Micro-SIM) or Dual SIM (Micro-SIM",
        displayType: "IPS LCD capacitive touchscreen  16M colors",
        displayResolution: "5.0 inches",
        displaySize: "720 x 1280 pixels (~294 ppi pixel density)",
        os: "Android 6.0 (Marshmallow)",
        cpu: "Quad-core 1.25 GHz Cortex-A53",
        chipset: "Mediatek MT6737",
        gpu: "Mali-T720MP2",
        externalMemory: "microSD  up to 256 GB",
        internalMemory: [
            "8 GB"
        ],
        ram: "1 GB RAM",
        primaryCamera: [
            "8 MP",
            "autofocus",
            "LED flash"
        ],
        secondaryCmera: ["2 MP"],
        speaker: "Yes",
        audioJack: "Yes",
        wlan: ["Yes"],
        bluetooth: ["Yes"],
        gps: "Yes with A-GPS",
        nfc: "",
        radio: "FM radio",
        usb: "microUSB 2.0",
        sensors: [
            "Accelerometer",
            "proximity"
        ],
        battery: "Removable Li-Ion 2000 mAh battery",
        colors: [
            "Black",
            "White"
        ],
        "options": {
            "colors": [
                {
                    "code": 1000,
                    "name": "Black"
                },
                {
                    "code": 1001,
                    "name": "White"
                }
            ],
            "storages": [
                {
                    "code": 2000,
                    "name": "8 GB"
                }
            ]
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GetProductDetailUseCase,
                {
                    provide: ProductApiService,
                    useValue: jasmine.createSpyObj('ProductApiService', ['getById'])
                },
                {
                    provide: LocalStorageCacheService,
                    useValue: jasmine.createSpyObj('LocalStorageCacheService', ['get', 'set'])
                }
            ]
        });

        useCase = TestBed.inject(GetProductDetailUseCase);
        productApiSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
        localStorageSpy = TestBed.inject(LocalStorageCacheService) as jasmine.SpyObj<LocalStorageCacheService>;
    });

    it('should create the use case', () => {
        expect(useCase).toBeTruthy();
    });

    it('should return detail from cache if available', (done) => {
        localStorageSpy.get.and.returnValue(MOCK_PRODUCT_DETAIL);

        useCase.execute('1').subscribe(detail => {
            expect(detail).toEqual(MOCK_PRODUCT_DETAIL);
            expect(productApiSpy.getById).not.toHaveBeenCalled();
            done();
        });
    });

    it('should call API and set cache if no cache is available', (done) => {
        localStorageSpy.get.and.returnValue(null);
        productApiSpy.getById.and.returnValue(of(MOCK_PRODUCT_DETAIL));

        useCase.execute('8hKbH2UHPM_944nRHYN1n').subscribe(detail => {
            expect(detail).toEqual(MOCK_PRODUCT_DETAIL);
            expect(productApiSpy.getById).toHaveBeenCalledWith('8hKbH2UHPM_944nRHYN1n');
            expect(localStorageSpy.set).toHaveBeenCalledWith('product-detail-8hKbH2UHPM_944nRHYN1n', MOCK_PRODUCT_DETAIL);
            done();
        });
    });
});
