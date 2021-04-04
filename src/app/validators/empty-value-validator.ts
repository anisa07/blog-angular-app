import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const emptyValueValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return control.touched && value && value.trim() ? null : { emptyValue: true };
}
