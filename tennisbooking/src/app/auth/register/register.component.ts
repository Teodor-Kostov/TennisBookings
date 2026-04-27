import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EmailDirective } from '../../../directives/email.directive';
import { MatchPasswordsDirective } from '../../../directives/match-passwords.directive';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, EmailDirective, MatchPasswordsDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = {
      username: form.value.username,
      email: form.value.email,
      tel: form.value['select-tel'] + form.value.tel,
      password: form.value.passwords.password,
      repeatPassword: form.value.passwords.rePassword
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }
}
