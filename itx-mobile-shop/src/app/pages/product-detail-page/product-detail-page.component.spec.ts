import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailPageComponent } from './product-detail-page.component';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { GetProductDetailUseCase } from '../../application/use-cases/get-product-detail.usecase';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../domain/models/product.model';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

const MOCK_PRODUCT_DETAIL: ProductDetail = {
    id: '8hKbH2UHPM_944nRHYN1n',
    brand: 'Acer',
    model: 'Liquid Z6',
    price: '120',
    imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg',
    networkTechnology: '',
    networkSpeed: '',
    gprs: '',
    edge: '',
    announced: '2016  August',
    status: 'Available. Released 2016  December',
    dimentions: '-',
    weight: '',
    sim: 'Single SIM',
    displayType: 'IPS LCD',
    displayResolution: '720 x 1280',
    displaySize: '5.0 inches',
    os: 'Android',
    cpu: 'Quad-core',
    chipset: 'Mediatek',
    gpu: 'Mali',
    externalMemory: 'microSD',
    internalMemory: ['8 GB'],
    ram: '1 GB',
    primaryCamera: ['8 MP'],
    secondaryCmera: ['2 MP'],
    speaker: 'Yes',
    audioJack: 'Yes',
    wlan: ['Yes'],
    bluetooth: ['Yes'],
    gps: 'Yes',
    nfc: '',
    radio: 'FM',
    usb: 'microUSB',
    sensors: ['Accelerometer'],
    battery: '2000 mAh',
    colors: ['Black', 'White'],
    options: {
        colors: [
            { code: 1000, name: 'Black' },
            { code: 1001, name: 'White' }
        ],
        storages: [
            { code: 2000, name: '8 GB' }
        ]
    }
};

describe('ProductDetailPageComponent (simplified)', () => {
    let fixture: ComponentFixture<ProductDetailPageComponent>;
    let mockDetailUseCase: jasmine.SpyObj<GetProductDetailUseCase>;

    beforeEach(async () => {
        mockDetailUseCase = jasmine.createSpyObj('GetProductDetailUseCase', ['execute']);
        await TestBed.configureTestingModule({
            imports: [ProductDetailPageComponent],
            providers: [
                provideRouter([]),
                provideHttpClient(),
                { provide: GetProductDetailUseCase, useValue: mockDetailUseCase },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => '8hKbH2UHPM_944nRHYN1n'
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        mockDetailUseCase.execute.and.returnValue(of(MOCK_PRODUCT_DETAIL));

        fixture = TestBed.createComponent(ProductDetailPageComponent);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should display product title', () => {
        const title = fixture.debugElement.query(By.css('h1'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Acer Liquid Z6');
    });

    it('should display product image', () => {
        const img = fixture.debugElement.query(By.css('img'));
        expect(img).not.toBeNull();
        expect(img.nativeElement.src).toContain(MOCK_PRODUCT_DETAIL.imgUrl);
    });
});
