import { TestBed } from "@angular/core/testing";

import { FridgeStoreService } from "./fridge-store.service";

describe("FridgeStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FridgeStoreService = TestBed.get(FridgeStoreService);
    expect(service).toBeTruthy();
  });
});
