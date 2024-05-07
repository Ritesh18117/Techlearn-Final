import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logout() {
    throw new Error('Method not implemented.');
  }

  credentials = {
    email: "",
    password: ""
  }

  errorMessage = ''; // To display error messages to the user

  constructor(private userService: UserService, private router: Router) { }
  login() {
    this.userService.login(this.credentials.email,this.credentials.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token); // Store the token in local storage
        this.router.navigate(['/dashboard']); // Redirect to a protected route
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password'; // Set an error message
      }
    );
  }


}
