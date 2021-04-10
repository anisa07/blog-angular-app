import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { passwordIdentityValidator } from '../../utils/validators/password-identity-validator';
import { Signup } from '../../models/Signup';
import { UserService } from '../../services/user.service';
import { EMAIL_REGEXP, NAME_REGEXP, PWD_REGEXP, STORE_USER_KEY } from '../../utils/constants';
import { distinctUntilChanged } from 'rxjs/operators';
import { LocalstoreService } from '../../services/localstore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupError: string = '';

  constructor(private userService: UserService, private localstoreService: LocalstoreService, private formBuilder: FormBuilder, private router: Router) { }

  onChanges(): void {
    this.signupForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      if (this.signupError) {
        this.signupError = '';
      }
    });
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(NAME_REGEXP)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      password: ['', [Validators.required, Validators.pattern(PWD_REGEXP)]],
      repeatPassword: ['']
    }, { validators: [passwordIdentityValidator] });

    this.onChanges();
  }

  get name() {
    return this.signupForm.controls['name'];
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  get password() {
    return this.signupForm.controls['password'];
  }

  get repeatPassword() {
    return this.signupForm.controls['repeatPassword'];
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
        this.signupForm.markAsPristine();
        this.router.navigate([""]);
      },
      err => { 
        this.signupError = err.error.message;
      })
    }
  }

}
