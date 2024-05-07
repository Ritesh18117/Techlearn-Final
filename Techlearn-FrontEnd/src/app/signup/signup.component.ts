import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule], // Ensure HttpClientModule is imported
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Correct the property name from 'styleUrl' to 'styleUrls'
})
export class SignupComponent {
  user = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  submit() {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('User registered:', response);
        this.router.navigate(['/login']); // Redirect after registration
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
