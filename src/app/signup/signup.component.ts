import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordIdentityValidator } from '../directives/password-identity-validator.directive';
import { Signup } from '../models/Signup';
import { UserServiceService } from '../services/user.service';
import { EMAIL_REGEXP, NAME_REGEXP, PWD_REGEXP } from '../utils/constants';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = {} as FormGroup;
  name: FormControl = {} as FormControl;
  email: FormControl = {} as FormControl;
  password: FormControl = {} as FormControl;
  repeatPassword: FormControl = {} as FormControl;
  signupError: string = '';

  constructor(private userService: UserServiceService) { }

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
        // console.log(response);
        // save user data and token
        this.signupForm.reset();
        this.signupForm.markAsUntouched();
      },
      err => { 
        this.signupError = err.error.message;
      })
    }
  }

}
