import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { EmailDirective } from '../../../../directives/email.directive';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm){
    if(form.invalid){
      return;
    }
  console.log(form.value);


    const data = {
      email: form.value.email,
      password: form.value.password
    };

     this.authService.login(data).subscribe({
      next: (user) => {

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

}
