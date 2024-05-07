import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class ProfileComponent {
  editProfile: boolean = false;
  token: any;
  profile: any = {
      name: '',
      contact: '',
      user: { username: '' },
      gender: ''
  };

  editProfileMethod() {
    this.editProfile = !this.editProfile;
  }

  onSubmit() {  
    this.editProfile = !this.editProfile;
  }
}
