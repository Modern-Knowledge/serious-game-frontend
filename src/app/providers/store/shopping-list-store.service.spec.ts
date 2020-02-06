import { TestBed } from "@angular/core/testing";

import { ShoppingListStoreService } from "./shopping-list-store.service";

describe("ShoppingListStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ShoppingListStoreService = TestBed.get(ShoppingListStoreService);
    expect(service).toBeTruthy();
  });
});
