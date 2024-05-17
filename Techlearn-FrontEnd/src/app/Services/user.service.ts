import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service globally available in the application
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  // Register a new user
  register(userData:any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  // Method to log in and store the authentication token
  login(email:string,password:string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  // Logout the current user
  logout(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/logout`)
      .pipe(catchError(this.handleError));
  }

  // Get the current user's profile
  getProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http
      .get(`${this.baseUrl}/profile`, {headers})
      .pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Example: check if there's a stored user
  }

  // Update the user profile
  updateProfile(updateData:any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http
      .put(`${this.baseUrl}/profile`, updateData, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error:any): Observable<any> {
    console.error('An error occurred', error);
    throw error;
  }
}
