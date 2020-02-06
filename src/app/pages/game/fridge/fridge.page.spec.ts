import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FridgePage } from "./fridge.page";

describe("FridgePage", () => {
  let component: FridgePage;
  let fixture: ComponentFixture<FridgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
