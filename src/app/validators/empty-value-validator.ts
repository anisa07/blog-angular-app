import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const emptyValueValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(!(control.value as string).trim()){
        return {cannotContainSpace: true}
    }

    return null;
}
