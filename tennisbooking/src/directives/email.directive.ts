import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailvalidator } from '../app/utils/email.validator';

@Directive({
  selector: '[appEmail]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EmailDirective
    }
  ]
})
export class EmailDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return emailvalidator(control);
  }
}
