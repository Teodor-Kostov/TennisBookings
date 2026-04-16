import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, formatNumber } from '@angular/common';
import { combineLatest, tap, BehaviorSubject, switchMap } from 'rxjs';
import { Court, TimeSlot, BusySlot, CreateBooking } from '../../types';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tennis-slots',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './tennis-slots.component.html',
  styleUrl: './tennis-slots.component.css'
})
export class TennisSlotsComponent implements OnInit {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  // Selected date as a BehaviorSubject so we can change it
  private selectedDate$ = new BehaviorSubject<Date>(new Date());

  courts$ = this.apiService.courtApi.getAllCourts();

  // Busy slots react to date changes
  busySlots$ = this.selectedDate$.pipe(
    switchMap(date => {
      const dateStr = date.toISOString().substring(0, 10);
      console.log('Fetching busy slots for:', dateStr);
      return this.apiService.bookingApi.getBusySlots(dateStr);
    }),
    tap(slots => console.log('Busy slots:', slots))
  );

  timeSlots: TimeSlot[] = [];
  busySlots: BusySlot[] = [];

  get selectedDate(): Date {
    return this.selectedDate$.value;
  }

  ngOnInit() {
    this.generateTimeSlots(7, 22);

    // Subscribe to keep local busySlots array updated
    this.busySlots$.subscribe(slots => {
      this.busySlots = slots;
    });

    // Trigger initial fetch for today's date
    this.selectedDate$.next(new Date());
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate$.next(new Date(input.value));
  }

  private generateTimeSlots(startHour: number, endHour: number): void {
    const slots: TimeSlot[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        start: this.formatHour(hour),
        end: this.formatHour(hour + 1)
      });
    }

    this.timeSlots = slots;
  }

  private formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  // Check if a specific court/slot combination is busy
  isSlotBusy(court: Court, slot: TimeSlot): boolean {
    return this.busySlots.some(
      busy => busy.court.number === court.number && busy.startTime === slot.start
    );
  }

  // Get the booking info for a specific slot
  getSlotBooking(court: Court, slot: TimeSlot): BusySlot | undefined {
    return this.busySlots.find(
      busy => busy.court.number === court.number && busy.startTime === slot.start
    );
  }

  // Check if the current user booked this slot
  isMyBooking(court: Court, slot: TimeSlot): boolean {
    const booking = this.getSlotBooking(court, slot);
    return booking?.user?._id === this.authService.user?._id;
  }

  // Get display text for a slot
  getSlotDisplayText(court: Court, slot: TimeSlot): string {
    if (!this.isSlotBusy(court, slot)) {
      return 'Free';
    }
    const booking = this.getSlotBooking(court, slot);
    if (this.isMyBooking(court, slot)) {
      return this.authService.user?.username || 'My Booking';
    }
    return 'Booked';
  }

  onSlotClick(court: Court, slot: TimeSlot): void {
    if (this.isSlotBusy(court, slot)) {
      console.log('Slot is already booked');
      return;
    }

    if (!this.authService.isLogged) {
      console.log('Please login to book a court');
      return;
    }

    const date = this.selectedDate.toISOString();
    const onlyDate = date.substring(0, 10);

    const booking: CreateBooking = {
      court: court._id,
      user: this.authService.user!._id,
      date: onlyDate,
      startTime: slot.start,
      endTime: slot.end
    };

    console.log('Creating booking:', booking);

    this.apiService.bookingApi.createBooking(booking).subscribe({
      next: (result) => {
        console.log('Booking created:', result);
        // Refresh busy slots
        this.selectedDate$.next(this.selectedDate);
      },
      error: (err) => {
        console.error('Booking failed:', err);
      }
    });
  }
}
