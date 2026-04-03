
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { User, LoginRequest, RegisterRequest, EditProfileRequest } from './types';



interface UserApi {
  login(data: LoginRequest): Observable<User>;
  register(data: RegisterRequest): Observable<User>;
  logout(): Observable<void>;
  getProfile(): Observable<User>;
  updateProfile(data: EditProfileRequest): Observable<User>;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  userApi: UserApi = {
    login: (data: LoginRequest) => this.http.post<User>(
      `${this.apiUrl}/login`,
      data,
      { withCredentials: true }
    ),
    register: (data: RegisterRequest) => this.http.post<User>(
      `${this.apiUrl}/register`,
      data,
      { withCredentials: true }
    ),
    logout: () => this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    ),
    getProfile: () => this.http.get<User>(
      `${this.apiUrl}/users/profile`,
      { withCredentials: true }
    ),
    updateProfile: (data: EditProfileRequest) => this.http.put<User>(
      `${this.apiUrl}/users/profile`,
      data,
      { withCredentials: true }
    )
  };
}
