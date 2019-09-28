import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayPlanningPage } from './day-planning.page';

describe('DayPlanningPage', () => {
  let component: DayPlanningPage;
  let fixture: ComponentFixture<DayPlanningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayPlanningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayPlanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
