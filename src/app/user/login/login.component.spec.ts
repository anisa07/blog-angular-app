import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {of} from 'rxjs';
import {Login} from '../../models/Login';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

class UserService {
  login(data: Login) {
   return of({})
  }
}

class Router {
  navigate(r: string) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [UserService, Router, FormBuilder, MatSnackBar, MaterialModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
