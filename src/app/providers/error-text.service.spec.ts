import { TestBed } from "@angular/core/testing";

import { ErrorTextService } from "./error-text.service";

describe("ErrorTextService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ErrorTextService = TestBed.get(ErrorTextService);
    expect(service).toBeTruthy();
  });
});
