import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelptextComponent } from './helptext.component';

describe('HelptextComponent', () => {
  let component: HelptextComponent;
  let fixture: ComponentFixture<HelptextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelptextComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelptextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
