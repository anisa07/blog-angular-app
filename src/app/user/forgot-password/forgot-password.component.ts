import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.form.controls['email']
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'This field is required';
    if (this.email.hasError('email')) return 'This email is incorrect';
    return  ''
  }

  submitForgotPassword() {
    const emailValue = this.email.value;
    this.userService.forgotPassword(emailValue)
      .subscribe(() => {
        this.message = `Link was sent to ${emailValue}. Follow this link to change password`;
      },(error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }
}
