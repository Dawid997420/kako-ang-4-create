import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesOptionsComponent } from './articles-options.component';

describe('ArticlesOptionsComponent', () => {
  let component: ArticlesOptionsComponent;
  let fixture: ComponentFixture<ArticlesOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
