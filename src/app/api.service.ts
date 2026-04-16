
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { User, LoginRequest, RegisterRequest, EditProfileRequest, Booking, CreateBooking, CreateCourt, BookingRaw, BusySlot, Court } from './types';


export type UpdateBooking = Omit<CreateBooking, 'user'>;

interface UserApi {
  login(data: LoginRequest): Observable<User>;
  register(data: RegisterRequest): Observable<User>;
  logout(): Observable<void>;
  getProfile(): Observable<User>;
  updateProfile(data: EditProfileRequest): Observable<User>;
}

interface BookingApi {
  getBookingList(): Observable<Booking[]>;
  getBusySlots(date: string): Observable<BusySlot[]>;
  createBooking(data: CreateBooking): Observable<BookingRaw>;
  updateBooking(id: string, data: UpdateBooking): Observable<BookingRaw>;
  //TODO: delete booking is can be made only by a Admin (future music)
}

interface CourtApi {
    getAllCourts(): Observable<Court[]>;

    getCourt(id: string): Observable<Court>;

    createCourt(data: CreateCourt): Observable<Court>;

    updateCourt(id: string, data: CreateCourt): Observable<Court>;

    deleteCourt(id: string): Observable<Court>;
  };


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

  bookingApi: BookingApi = {

    getBookingList: (): Observable<Booking[]> => {
      return this.http.get<Booking[]>(`${this.apiUrl}/bookings/admin`, {
        params: { date: new Date().toISOString() },
        withCredentials: true
      });
    },

    getBusySlots: (date: string): Observable<BusySlot[]> => {
      return this.http.get<BusySlot[]>(`${this.apiUrl}/bookings/busy`, {
        params: { date },
        withCredentials: true
      });
    },

    createBooking: (data: CreateBooking): Observable<BookingRaw> => {
      return this.http.post<BookingRaw>(`${this.apiUrl}/bookings`, data, {
        withCredentials: true
      });
    },

    updateBooking: (id: string, data: UpdateBooking): Observable<BookingRaw> => {
      return this.http.put<BookingRaw>(`${this.apiUrl}/bookings/${id}`, data, {
        withCredentials: true
      });
    }

  };

  courtApi: CourtApi = {
    getAllCourts: (): Observable<Court[]> => {
      return this.http.get<Court[]>(`${this.apiUrl}/courts`);
    },

    getCourt: (id: string): Observable<Court> => {
      return this.http.get<Court>(`${this.apiUrl}/courts/${id}`);
    },

    createCourt: (data: CreateCourt): Observable<Court> => {
      return this.http.post<Court>(`${this.apiUrl}/courts`, data, {
        withCredentials: true
      });
    },

    updateCourt: (id: string, data: CreateCourt): Observable<Court> => {
      return this.http.put<Court>(`${this.apiUrl}/courts/${id}`, data);
    },

    deleteCourt: (id: string): Observable<Court> => {
      return this.http.delete<Court>(`${this.apiUrl}/courts/${id}`);
    }
  };
}
