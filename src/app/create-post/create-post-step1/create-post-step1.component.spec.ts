import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostStep1Component } from './create-post-step1.component';

describe('CreatePostStep1Component', () => {
  let component: CreatePostStep1Component;
  let fixture: ComponentFixture<CreatePostStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
