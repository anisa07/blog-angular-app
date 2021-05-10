import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NAME_REGEXP} from '../../utils/constants';
import {User} from '../../models/User';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';
import {UserService} from '../../services/user.service';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  @Input()
  userData: User;
  @Output()
  getUserInfo = new EventEmitter<string>();
  submitCalled: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar,) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.userData.name, [Validators.required, Validators.pattern(NAME_REGEXP)]],
      bio: [this.userData.bio || '', [Validators.required, emptyValueValidator]],
      fileUpload: [this.userData.filename, [Validators.required]]
    })
  }

  onSave() {
    this.submitCalled = true;
    const formData: FormData = new FormData();
    formData.append('name', this.name.value);
    formData.append('bio', this.bio.value);

    const file: File = this.form.value.fileUpload;

    if (file && file instanceof File) {
      formData.append('photo', file, file.name);
    } else if (file && typeof file === "string") {
      formData.append('filename', file);
    }

    this.userService.updateUser(formData)
      .subscribe(() => {
        this.getUserInfo.emit(this.userData.id);
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }

  get name() {
    return this.form.controls['name'];
  }

  get bio() {
    return this.form.controls['bio'];
  }

  get fileUpload() {
    return this.form.controls['fileUpload'];
  }

  getNameErrorMessage(): string {
    if (this.name.errors.required) {
      return 'This filed is required';
    }
    if (this.name.errors.cannotContainSpace) {
      return 'Seems this filed has only spaces';
    }
    return '';
  }

  getBioErrorMessage(): string {
    if (this.bio.errors.required) {
      return 'This filed is required';
    }
    if (this.bio.errors.cannotContainSpace) {
      return 'Seems this filed has only spaces';
    }
    return '';
  }
}
