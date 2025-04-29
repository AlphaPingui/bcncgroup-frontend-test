import { TestBed } from '@angular/core/testing';
import { ProductApiService } from './product-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Product, ProductDetail } from '../../domain/models/product.model';
import { provideHttpClient } from '@angular/common/http';

describe('ProductApiService', () => {
    let service: ProductApiService;
    let httpMock: HttpTestingController;

    const MOCK_PRODUCT: Product = {
        id: '8hKbH2UHPM_944nRHYN1n',
        brand: 'Acer',
        model: 'Liquid Z6',
        price: 120,
        imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg'
    };

    const MOCK_PRODUCT_DETAIL: ProductDetail = {
        ...MOCK_PRODUCT,
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
                ProductApiService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(ProductApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch all products', () => {
        service.getAll().subscribe(products => {
            expect(products).toEqual([MOCK_PRODUCT]);
        });

        const req = httpMock.expectOne(`${environment.apiBaseUrl}/product`);
        expect(req.request.method).toBe('GET');
        req.flush([MOCK_PRODUCT]);
    });

    it('should fetch product by id', () => {
        service.getById('1').subscribe(product => {
            expect(product).toEqual(MOCK_PRODUCT_DETAIL);
        });

        const req = httpMock.expectOne(`${environment.apiBaseUrl}/product/1`);
        expect(req.request.method).toBe('GET');
        req.flush(MOCK_PRODUCT_DETAIL);
    });
});
