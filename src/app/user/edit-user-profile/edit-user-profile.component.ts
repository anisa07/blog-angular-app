import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NAME_REGEXP} from '../../utils/constants';
import {User} from '../../models/User';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';

@Component({
  selector: 'edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  @Input()
  userData: User;
  submitCalled: boolean = false;

  constructor(private fb: FormBuilder) {

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
