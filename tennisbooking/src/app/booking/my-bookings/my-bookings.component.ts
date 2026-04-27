import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ApiService } from '../../api.service';
import { map } from 'rxjs';
import { BookingRaw } from '../../types';

@Component({
  selector: 'app-my-bookings',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  private apiService = inject(ApiService);

  today = new Date();

  userBookings$ = this.apiService.bookingApi.getUserBookingList().pipe(
    map(bookings =>
      [...bookings].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    )
  );

  isFutureBooking(booking: BookingRaw): boolean {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  }
}
