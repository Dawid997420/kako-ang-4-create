import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleArticleComponent } from './edit-single-article.component';

describe('EditSingleArticleComponent', () => {
  let component: EditSingleArticleComponent;
  let fixture: ComponentFixture<EditSingleArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSingleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
