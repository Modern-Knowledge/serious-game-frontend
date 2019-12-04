import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ShelfComponent } from "./shelf.component";

describe("ShelfComponent", () => {
  let component: ShelfComponent;
  let fixture: ComponentFixture<ShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
