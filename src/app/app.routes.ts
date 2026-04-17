import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TennisSlotsComponent } from './tennis/tennis-slots/tennis-slots.component';
import { MyBookingsComponent } from './booking/my-bookings/my-bookings.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'slots', component: TennisSlotsComponent},
  {path: 'my-bookings', component: MyBookingsComponent},
];
