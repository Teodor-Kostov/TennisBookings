import { Directive } from '@angular/core';
import { matchPasswordsValidator } from '../app/utils/match-password.validator';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPasswords]',
  standalone: true,
  providers: [
    {
       provide: NG_VALIDATORS,
      multi: true,
      useExisting: MatchPasswordsDirective

    }
  ]
})
export class MatchPasswordsDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return matchPasswordsValidator(control)
  }

}
