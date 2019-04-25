import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuPage } from './sudoku.page';

describe('SudokuPage', () => {
  let component: SudokuPage;
  let fixture: ComponentFixture<SudokuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudokuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
