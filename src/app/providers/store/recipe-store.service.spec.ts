import { TestBed } from "@angular/core/testing";

import { RecipeStoreService } from "./recipe-store.service";

describe("RecipeStoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: RecipeStoreService = TestBed.get(RecipeStoreService);
    expect(service).toBeTruthy();
  });
});
