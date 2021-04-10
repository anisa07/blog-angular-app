import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstoreService } from '../../services/localstore.service';
import { UserService } from '../../services/user.service';
import { EMAIL_REGEXP, PWD_REGEXP, STORE_USER_KEY } from '../../utils/constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailPattern = EMAIL_REGEXP;
  passwordPattern = PWD_REGEXP;
  errorMessage: string = '';

  constructor(private userService: UserService, private localstoreService: LocalstoreService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.errorMessage = "";
    this.userService.login(form.value).subscribe(response => {
      this.localstoreService.setData(STORE_USER_KEY, response || '');
      form.resetForm();
    },
      err => {
        this.errorMessage = err.error.message;
      })
  }
}

