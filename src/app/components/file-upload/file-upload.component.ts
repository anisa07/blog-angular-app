import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent
  }, { provide: NG_VALIDATORS, multi: true, useExisting: FileUploadComponent }]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, Validator {
  filename: string = "";
  onChange: Function = (f: File) => { };
  onTouched: Function = () => { };
  onValidatorChange: Function = () => { };
  isDisabled: boolean = false;
  @Input() validationRequired: boolean;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    if (!this.validationRequired) {
      return null;
    }

    if (this.validationRequired && !this.filename && control.touched) {
      return { required: true };
    }

    return null;
  }
  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

  writeValue(value: any): void {
    this.filename = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
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
}
