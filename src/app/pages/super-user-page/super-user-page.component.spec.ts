import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserPageComponent } from './super-user-page.component';

describe('SuperUserPageComponent', () => {
  let component: SuperUserPageComponent;
  let fixture: ComponentFixture<SuperUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperUserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
