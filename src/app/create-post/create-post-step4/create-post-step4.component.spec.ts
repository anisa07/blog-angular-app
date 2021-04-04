import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostStep4Component } from './create-post-step4.component';

describe('CreatePostStep4Component', () => {
  let component: CreatePostStep4Component;
  let fixture: ComponentFixture<CreatePostStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostStep4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
