import { TestBed } from '@angular/core/testing';

import { MealtimeStoreService } from './mealtime-store.service';

describe('MealtimeStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealtimeStoreService = TestBed.get(MealtimeStoreService);
    expect(service).toBeTruthy();
  });
});
