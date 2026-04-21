import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { EditProfileRequest } from '../../types';
import { emailvalidator } from '../../utils/email.validator';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  isEditMode: boolean = false;

  profileDetails: EditProfileRequest = {
    username: '',
    email: '',
    tel: '',
  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailvalidator]),
    tel: new FormControl(''),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const { username, email, tel } = this.authService.user!;
    this.profileDetails = { username, email, tel: tel! };

    this.form.setValue({
      username,
      email,
      tel: tel!,
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as EditProfileRequest;

    const data = this.profileDetails;

    this.authService.updateProfile(data).subscribe(() => {
      this.toggleEditMode();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }
}
