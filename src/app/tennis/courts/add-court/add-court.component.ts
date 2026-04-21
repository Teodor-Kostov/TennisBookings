import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { CourtType } from '../../../types';

@Component({
  selector: 'app-add-court',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-court.component.html',
  styleUrl: './add-court.component.css'
})
export class AddCourtComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);

  courtTypes: CourtType[] = ['Hard', 'Clay'];

  courtNumber: number | null = null;
  courtType: CourtType = 'Hard';
  isActive: boolean = true;

  onSubmit(form: NgForm) {
    if (form.invalid || !this.courtNumber) return;

    this.apiService.courtApi.createCourt({
      number: this.courtNumber,
      type: this.courtType,
      isActive: this.isActive
    }).subscribe({
      next: () => {
        this.router.navigate(['/courts']);
      },
      error: (err) => console.error('Failed to create court', err)
    });
  }
}
