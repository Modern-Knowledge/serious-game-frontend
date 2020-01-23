/*
 * Copyright (c) 2020 Florian Mold
 * All rights reserved.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecipeInfoPage } from "./recipe-info.page";

describe("RecipeInfoPage", () => {
  let component: RecipeInfoPage;
  let fixture: ComponentFixture<RecipeInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
