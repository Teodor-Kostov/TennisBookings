import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Maybe } from "../types";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9-]{3,}\.[A-Za-z]{2,}$/;

export function emailvalidator(control: AbstractControl): ValidationErrors | null{
    const value = control.value as Maybe<string>
    if (!value) {
    return null;
  }

  return EMAIL_REGEX.test(value)
    ? null
    : { Email: true };
}


