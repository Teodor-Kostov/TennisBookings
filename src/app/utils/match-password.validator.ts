import { AbstractControl, ValidationErrors } from "@angular/forms";


export function matchPasswordsValidator(control: AbstractControl): ValidationErrors | null{
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;


    const passPattern = /^[A-Za-z0-9]{5,}$/;


    const isEmpty = !password || password.length === 0;

    // Only validate pattern if not empty
    const isPasswordValid = !isEmpty && passPattern.test(password);
    const doPasswordsMatch = password === rePassword;

    if (!isEmpty && isPasswordValid && doPasswordsMatch) {
        return null;
    }

    return {
      matchPasswords: true,
      ...(isEmpty && { passwordIsRequired: true }),
      ...(!isEmpty && !isPasswordValid && { passwordPattern: true }),
      ...(!doPasswordsMatch && { passwordMismatch: true })
    };

}
