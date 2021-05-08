import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstoreService } from '../../services/localstore.service';
import { UserService } from '../../services/user.service';
import { STORE_USER_KEY } from '../../utils/constants';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService, private localstoreService: LocalstoreService, private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'This field is required' : ''
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'This field is required' : '';
  }

  submit() {
    this.userService.login(this.loginForm.value).subscribe(response => {
      this.loginForm.reset();
      this.loginForm.markAsPristine();
      this.router.navigate([""]);
    }, (error: Error) => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: error.message, type: 'ERROR'
        }
      });
    })
  }
}

