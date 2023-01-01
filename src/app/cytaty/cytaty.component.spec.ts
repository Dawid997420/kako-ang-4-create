import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytatyComponent } from './cytaty.component';

describe('CytatyComponent', () => {
  let component: CytatyComponent;
  let fixture: ComponentFixture<CytatyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytatyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CytatyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
