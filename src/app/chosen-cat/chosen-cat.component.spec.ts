import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenCatComponent } from './chosen-cat.component';

describe('ChosenCatComponent', () => {
  let component: ChosenCatComponent;
  let fixture: ComponentFixture<ChosenCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosenCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
