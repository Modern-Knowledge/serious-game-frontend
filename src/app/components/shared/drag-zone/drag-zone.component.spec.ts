import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DragZoneComponent } from "./drag-zone.component";

describe("DragZoneComponent", () => {
  let component: DragZoneComponent;
  let fixture: ComponentFixture<DragZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragZoneComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
