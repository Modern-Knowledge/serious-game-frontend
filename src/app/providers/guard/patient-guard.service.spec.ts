import { TestBed } from "@angular/core/testing";

import { PatientGuardService } from "./patient-guard.service";

describe("PatientGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PatientGuardService = TestBed.get(PatientGuardService);
    expect(service).toBeTruthy();
  });
});
