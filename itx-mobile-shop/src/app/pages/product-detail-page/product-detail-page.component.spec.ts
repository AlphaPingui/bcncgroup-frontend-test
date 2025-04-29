import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailPageComponent } from './product-detail-page.component';
import { provideRouter } from '@angular/router';
import { GetProductDetailUseCase } from '../../application/use-cases/get-product-detail.usecase';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../domain/models/product.model';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

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

describe('ProductDetailPageComponent', () => {
    let fixture: ComponentFixture<ProductDetailPageComponent>;
    let component: ProductDetailPageComponent;
    let mockDetailUseCase: jasmine.SpyObj<GetProductDetailUseCase>;

    beforeEach(async () => {
        mockDetailUseCase = jasmine.createSpyObj('GetProductDetailUseCase', ['execute']);

        await TestBed.configureTestingModule({
            imports: [ProductDetailPageComponent],
            providers: [
                provideRouter([]),
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: GetProductDetailUseCase,
                    useValue: mockDetailUseCase
                },
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

        fixture = TestBed.createComponent(ProductDetailPageComponent);
        component = fixture.componentInstance;
        component.product.set(MOCK_PRODUCT_DETAIL);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display product title', () => {
        const title = fixture.debugElement.query(By.css('h1'));
        expect(title.nativeElement.textContent.trim()).toBe('Acer Liquid Z6');
      });
    
      it('should display product image', () => {
        const img = fixture.debugElement.query(By.css('img'));
        expect(img.nativeElement.src).toContain('https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg');
      });
});