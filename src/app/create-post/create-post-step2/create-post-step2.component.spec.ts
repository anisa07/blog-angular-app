import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostStep2Component } from './create-post-step2.component';

describe('CreatePostStep2Component', () => {
  let component: CreatePostStep2Component;
  let fixture: ComponentFixture<CreatePostStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
