import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealtimeComponent } from './mealtime.component';

describe('MealtimeComponent', () => {
  let component: MealtimeComponent;
  let fixture: ComponentFixture<MealtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealtimeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
