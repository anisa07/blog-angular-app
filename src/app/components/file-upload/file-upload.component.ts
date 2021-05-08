import { Component, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { CustomBaseComponent } from '../custom-base/custom-base.component';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: FileUploadComponent
  }]
})
export class FileUploadComponent extends CustomBaseComponent {

  filename: string = "";
  @Input() validationRequired: boolean;

  constructor() {
    super();
  }

  validate(control: AbstractControl): ValidationErrors {
    if (!this.validationRequired) {
      return null;
    }

    if (this.validationRequired && !this.filename && control.touched) {
      return { required: true };
    }

    return null;
  }

  writeValue(value: any): void {
    this.filename = value;
  }

  onClick(e: HTMLInputElement) {
    e.click();
    this.onTouched();
  }

  onUpload(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.onChange(file);
      this.filename = file.name;
      this.onValidatorChange();
    }
  }

  onCancel() {
    this.onChange(null);
    this.filename = '';
    this.onValidatorChange();
  }
}
