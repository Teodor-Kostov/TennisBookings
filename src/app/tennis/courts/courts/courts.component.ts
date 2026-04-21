import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Court } from '../../../types';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courts.component.html',
  styleUrl: './courts.component.css'
})
export class CourtsComponent implements OnInit {
  private apiService = inject(ApiService);
  courts = signal<Court[]>([]);

  ngOnInit() {
    this.loadCourts();
  }

  loadCourts() {
    this.apiService.courtApi.getAllCourts().subscribe({
      next: (data) => this.courts.set(data),
      error: (err) => console.error('Failed to load courts', err)
    });
  }

  toggleStatus(court: Court) {
    this.apiService.courtApi.updateCourt(court._id, {
      number: court.number,
      type: court.type,
      isActive: !court.isActive
    }).subscribe({
      next: () => this.loadCourts(),
      error: (err) => console.error('Failed to update court', err)
    });
  }

  deleteCourt(court: Court) {
    if (confirm(`Are you sure you want to delete Court #${court.number}?`)) {
      this.apiService.courtApi.deleteCourt(court._id).subscribe({
        next: () => this.loadCourts(),
        error: (err) => console.error('Failed to delete court', err)
      });
    }
  }
}
