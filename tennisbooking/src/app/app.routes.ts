import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TennisSlotsComponent } from './tennis/tennis-slots/tennis-slots.component';
import { MyBookingsComponent } from './booking/my-bookings/my-bookings.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { CourtsComponent } from './tennis/courts/courts/courts.component';
import { AddCourtComponent } from './tennis/courts/add-court/add-court.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  //for all users
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent},
  //for logged in users
  {path: 'slots', component: TennisSlotsComponent, canActivate: [authGuard]},
  {path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [authGuard]},
  {path: 'courts', component: CourtsComponent, canActivate: [authGuard]},
  {path: 'courts/add', component: AddCourtComponent, canActivate: [authGuard]},
];
