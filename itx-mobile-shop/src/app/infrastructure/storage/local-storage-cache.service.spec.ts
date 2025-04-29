import { TestBed } from '@angular/core/testing';
import { LocalStorageCacheService } from './local-storage-cache.service';

describe('LocalStorageCacheService', () => {
    let service: LocalStorageCacheService;

    const STORAGE_PREFIX = 'cache:';
    const MOCK_KEY = 'test-key';
    const TTL = 3600 * 1000;
    const MOCK_DATA = {
        "expires": 1745943833271,
        "data": [
            {
                "id": "ZmGrkLRPXOTpxsU4jjAcv",
                "brand": "Acer",
                "model": "Iconia Talk S",
                "price": "170",
                "imgUrl": "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg"
            },
            {
                "id": "cGjFJlmqNPIwU59AOcY8H",
                "brand": "Acer",
                "model": "Liquid Z6 Plus",
                "price": "250",
                "imgUrl": "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg"
            }
        ]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalStorageCacheService]
        });

        service = TestBed.inject(LocalStorageCacheService);
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should save data into localStorage with correct structure', () => {
        service.set(MOCK_KEY, MOCK_DATA);

        const stored = JSON.parse(localStorage.getItem(STORAGE_PREFIX + MOCK_KEY) as string);
        expect(stored).toBeTruthy();
        expect(stored.data).toEqual(MOCK_DATA);
        expect(typeof stored.expires).toBe('number');
    });

    it('should retrieve data if cache is valid', () => {
        const cacheObject = { TTL, data: MOCK_DATA };
        localStorage.setItem(STORAGE_PREFIX + MOCK_KEY, JSON.stringify(cacheObject));

        const result = service.get(MOCK_KEY);
        expect(result).toEqual(MOCK_DATA);
    });

    it('should remove and return null if cache is expired', () => {
        const expires = Date.now() - 1000;
        const cacheObject = { expires, data: MOCK_DATA };
        localStorage.setItem(STORAGE_PREFIX + MOCK_KEY, JSON.stringify(cacheObject));

        const result = service.get(MOCK_KEY);
        expect(result).toBeNull();
        expect(localStorage.getItem(STORAGE_PREFIX + MOCK_KEY)).toBeNull();
    });

    it('should remove and return null if cache is invalid JSON', () => {
        localStorage.setItem(STORAGE_PREFIX + MOCK_KEY, 'aaaaaaa');

        const result = service.get(MOCK_KEY);
        expect(result).toBeNull();
        expect(localStorage.getItem(STORAGE_PREFIX + MOCK_KEY)).toBeNull();
    });
});
