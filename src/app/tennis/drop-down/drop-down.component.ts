import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { type CourtType } from '../../types';

interface CourtTypeOption {
  label: string;
  value: CourtType;
}

@Component({
    selector: 'app-court-type-dropdown',
    templateUrl: './drop-down.component.html',
    standalone: true,
    imports: [FormsModule, DropdownModule]
})
export class CourtTypeDropdownComponent {
    courtTypes: CourtTypeOption[] = [
        { label: 'Clay Court', value: 'Clay' },
        { label: 'Hard Court', value: 'Hard' }
    ];

    selectedCourtType: CourtType | undefined;

    @Output() courtTypeChange = new EventEmitter<CourtType>();

    onCourtTypeChange(): void {
        if (this.selectedCourtType) {
            this.courtTypeChange.emit(this.selectedCourtType);
        }
    }
}
