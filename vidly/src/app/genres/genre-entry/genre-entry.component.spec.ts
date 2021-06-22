import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreEntryComponent } from './genre-entry.component';

describe('GenreEntryComponent', () => {
  let component: GenreEntryComponent;
  let fixture: ComponentFixture<GenreEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
