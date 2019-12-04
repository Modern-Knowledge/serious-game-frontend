import { TestBed } from "@angular/core/testing";

import { AbstractStoreService } from "./abstract-store.service";

describe("AbstractStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AbstractStoreService = TestBed.get(AbstractStoreService);
    expect(service).toBeTruthy();
  });
});
