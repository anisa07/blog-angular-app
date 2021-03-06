import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {Error} from '../../models/Error';
// import {SnackbarComponent} from '../../snackbar/snackbar.component';
// import {MatSnackBar} from '@angular/material/snack-bar';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    // private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, emptyValueValidator]]
    })
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'This field is required';
    if (this.email.hasError('email')) return 'This email is incorrect';
    return  ''
  }

  getPasswordError() {
    if (this.password.hasError('required')) return 'This field is required';
    if (this.password.errors.cannotContainSpace) {
      return "Seems this filed has only spaces"
    }
    return ""
  }

  submit() {
    this.userService.login(this.loginForm.value).subscribe(() => {
      // this.loginForm.reset();
      // this.loginForm.markAsPristine();
      this.router.navigate([""]);
    }, (error: Error) => {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: error.message, type: 'ERROR'
      //   }
      // });
    })
  }
}

