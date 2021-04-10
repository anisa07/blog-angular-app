import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostStep3Component } from './create-post-step3.component';

describe('CreatePostStep3Component', () => {
  let component: CreatePostStep3Component;
  let fixture: ComponentFixture<CreatePostStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
