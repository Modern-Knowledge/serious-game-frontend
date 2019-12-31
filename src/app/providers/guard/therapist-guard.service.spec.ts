import { TestBed } from "@angular/core/testing";

import { TherapistGuardService } from "./therapist-guard.service";

describe("TherapistGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TherapistGuardService = TestBed.get(TherapistGuardService);
    expect(service).toBeTruthy();
  });
});
