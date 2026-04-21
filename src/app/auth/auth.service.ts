import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { type User, RegisterRequest, LoginRequest, EditProfileRequest } from '../types';
import { BehaviorSubject, Observable, Subscription, tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private userSubject$ = new BehaviorSubject<User | null>(null);
  private isUserAdminSubject$ = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject$.asObservable();
  admin$ = this.isUserAdminSubject$.asObservable();

  user: User | null = null;
  private userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }



  constructor(private apiService: ApiService) {
    this.userSubscription = this.userSubject$.subscribe((user) => {
      this.user = user;
    });
  }

  register(data: RegisterRequest): Observable<User> {
    return this.apiService.userApi.register(data).pipe(
      tap((user) => this.userSubject$.next(user))
    );
  }

  login(data: LoginRequest): Observable<User> {
    return this.apiService.userApi.login(data).pipe(
      switchMap(() => this.apiService.userApi.getProfile()),
      tap(profile => {
        this.userSubject$.next(profile);
        const isAdmin = profile.role === 'admin';
        this.isUserAdminSubject$.next(isAdmin);
      })
    );
  }

  logout(): Observable<void> {
    return this.apiService.userApi.logout().pipe(
      tap(() => {
        this.userSubject$.next(null);
        this.isUserAdminSubject$.next(false);
      })
    );
  }

  getProfile(): Observable<User> {
    return this.apiService.userApi.getProfile().pipe(
      tap((user) => this.userSubject$.next(user))
    );
  }

  updateProfile(data: EditProfileRequest): Observable<User> {
    return this.apiService.userApi.updateProfile(data).pipe(
      tap((user) => this.userSubject$.next(user))
    );
  }


  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
