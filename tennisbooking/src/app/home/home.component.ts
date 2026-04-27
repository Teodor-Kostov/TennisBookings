import { Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-home',
  imports: [WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
