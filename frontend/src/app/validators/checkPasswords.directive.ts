import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const checkPasswords: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    let password = control.get('password')!.value;
    let confirmPassword = control.get('confirmPassword')!.value;
    let passwordMatch = password === confirmPassword;

    return passwordMatch ? null : { passwordsDontMatch: true };
  };
