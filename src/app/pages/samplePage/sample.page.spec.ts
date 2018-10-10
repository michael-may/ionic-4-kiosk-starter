import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePage } from './sample.page';

describe('SamplePage', () => {
  let component: SamplePage;
  let fixture: ComponentFixture<SamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
