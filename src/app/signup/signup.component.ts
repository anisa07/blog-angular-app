import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordIdentityValidator } from '../validators/password-identity-validator';
import { Signup } from '../models/Signup';
import { UserService } from '../services/user.service';
import { EMAIL_REGEXP, NAME_REGEXP, PWD_REGEXP, STORE_USER_KEY } from '../utils/constants';
import { distinctUntilChanged } from 'rxjs/operators';
import { LocalstoreService } from '../services/localstore.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  repeatPassword: FormControl;
  signupError: string = '';

  constructor(private userService: UserService, private localstoreService: LocalstoreService) { }

  onChanges(): void {
    this.signupForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      if (this.signupError) {
        this.signupError = '';
      }
    });
  }

  createFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.pattern(NAME_REGEXP)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]);
    this.password = new FormControl('', [Validators.required, Validators.pattern(PWD_REGEXP)]);
    this.repeatPassword = new FormControl('', [Validators.required, Validators.pattern(PWD_REGEXP)]);
  }

  createForm() {
    this.signupForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
    }, { validators: [passwordIdentityValidator] });
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.onChanges();
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'This field is required';
    }
    return this.email.hasError('pattern') ? 'Email is invalid' : '';
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'This field is required';
    }
    return this.name.hasError('pattern') ? 'Name is too invalid' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'This field is required';
    }
    return this.password.hasError('pattern') ? 'Password is invalid' : '';
  }

  getRepeatPasswordError() {
    if (this.repeatPassword.hasError('required')) {
      return 'This field is required';
    }
    if (this.repeatPassword.dirty && this.signupForm?.errors?.passwordsNotIdentical) {
      this.repeatPassword.setErrors({'pattern': true});
      return 'Password and repeated password are different';
    }
    return '';
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData: Signup = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }

      this.userService.signup(signupData).subscribe(response => {
        this.localstoreService.setData(STORE_USER_KEY, response || '');
        this.signupForm.reset();
        this.signupForm.markAsUntouched();
      },
      err => { 
        this.signupError = err.error.message;
      })
    }
  }

}
