import { TestBed } from '@angular/core/testing';

import { CartStoreService } from './cart-store.service';

describe('CartStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartStoreService = TestBed.get(CartStoreService);
    expect(service).toBeTruthy();
  });
});
