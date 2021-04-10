import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordIdentityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  return password && repeatPassword && password.value === repeatPassword.value ? null : {passwordsNotIdentical: true};
}
