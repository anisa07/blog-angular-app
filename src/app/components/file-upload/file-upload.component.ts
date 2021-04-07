import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent
  }]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor{
  filename: string = "";
  onChange: Function = (f: File) => {};
  onTouched: Function = () => {};
  isDisabled: boolean = false;

  @Output() uploadFileEvent = new EventEmitter<File>();

  constructor() { }

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
    }
  }
}
