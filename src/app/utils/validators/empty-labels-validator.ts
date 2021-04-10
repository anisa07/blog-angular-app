import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const emptyLabelsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(!control.value.length){
        return {emptyLabels: true}
    }

    return null;
}
