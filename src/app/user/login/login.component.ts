import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstoreService } from '../../services/localstore.service';
import { UserService } from '../../services/user.service';
import { STORE_USER_KEY } from '../../utils/constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService, private localstoreService: LocalstoreService, private router: Router, private fb: FormBuilder) { }

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
    this.errorMessage = "";
    this.userService.login(this.loginForm.value).subscribe(response => {
      this.localstoreService.setData(STORE_USER_KEY, response || '');
      this.loginForm.reset();
      this.loginForm.markAsPristine();
      this.router.navigate([""]);
    },
      err => {
        this.errorMessage = err.error.message;
      })
  }
}

