import {Component, Input, OnInit} from '@angular/core';
import {STATE, User, USER_TYPE} from '../../models/User';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import {Error} from '../../models/Error';
// import {SnackbarComponent} from '../../snackbar/snackbar.component';
// import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {of} from 'rxjs';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input()
  user: User;
  form: FormGroup;
  types: USER_TYPE[] = [USER_TYPE.USER, USER_TYPE.SUPER];
  states: STATE[] = [STATE.ACTIVE, STATE.DELETED, STATE.BLOCKED];
  changed: boolean = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              // private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [this.user.type],
      state: [this.user.state]
    });

    this.onChange();
  }

  confirmUpdate() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: `Are you sure you want to update user name: ${this.user.name}, email: ${this.user.email}?`,
      }
    });

    return dialogRef.afterClosed();
  }

  onChange() {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(() => {
        this.changed = true;
      }
    );
  }

  canUpdateUser() {
    return this.user.type !== USER_TYPE.SUPER || this.userService.getUserId() === this.user.id;
  }

  updateUser() {
    this.confirmUpdate().pipe(
      take(1),
      switchMap((response) => {
        if (response) {
          this.user.state = this.getState().value;
          this.user.type = this.getType().value;
          return this.userService.manageUser(this.user);
        } else {
          return of(false);
        }
      })
    ).subscribe(() => {
      this.changed = false;
    }, (error: Error) => {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: error.message, type: 'ERROR'
      //   }
      // });
    });
  }


  getType() {
    return this.form.controls['type'];
  }

  getState() {
    return this.form.controls['state'];
  }
}
