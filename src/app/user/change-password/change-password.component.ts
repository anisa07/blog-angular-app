import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PWD_REGEXP} from '../../utils/constants';
import {passwordIdentityValidator} from '../../utils/validators/password-identity-validator';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  params: { [key: string]: string };

  constructor(private route: ActivatedRoute, private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar, private location: Location) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.params = params;
        }
      );
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(PWD_REGEXP)]],
      repeatPassword: ['']
    }, {validators: [passwordIdentityValidator]});
  }

  get password() {
    return this.form.controls['password'];
  }

  get repeatPassword() {
    return this.form.controls['repeatPassword'];
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
    if (this.repeatPassword.dirty && this.form?.errors?.passwordsNotIdentical) {
      this.repeatPassword.setErrors({'pattern': true});
      return 'Password and repeated password are different';
    }
    return '';
  }

  submitChangePassword() {
    const password = this.password.value;
    this.userService.changePassword({
      id: this.params?.id,
      token: this.params?.token,
      password
    }).subscribe(
      () => {
        !!this.params?.id ? this.router.navigate(['user', 'login']) : this.location.back();
      },
      (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }

}
