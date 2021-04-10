import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'custom-base',
  templateUrl: './custom-base.component.html',
  styleUrls: ['./custom-base.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: CustomBaseComponent
  }, 
  { 
    provide: NG_VALIDATORS, 
    multi: true, 
    useExisting: CustomBaseComponent 
  }]
})
export class CustomBaseComponent implements ControlValueAccessor, Validator {
  onChange: Function = (v: any) => { };
  onTouched: Function = () => { };
  onValidatorChange: Function = () => { };
  isDisabled: boolean = false;

  constructor() { }

  writeValue(obj: any): void {}

  validate(control: AbstractControl): ValidationErrors {
    return null;
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

  registerOnValidatorChange?(onValidatorChange: () => void): void {
   this.onValidatorChange = onValidatorChange;
  }
}
