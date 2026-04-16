import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private authService = inject(AuthService);
  user$ = this.authService.user$;

  constructor(private router: Router) {}
}
