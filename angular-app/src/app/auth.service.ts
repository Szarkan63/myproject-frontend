import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/users/';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if user is already logged in by looking for a token
    this.checkToken();
  }

  private checkToken(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.loggedIn.next(!!token);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
            console.log('Response ID:', response.id); // Debugging: Check if ID is received
            if (response.id) {
              localStorage.setItem('id', response.id.toString()); // Ensure userId is stored as string
            } else {
              console.error('User ID is missing in the response');
            }
            localStorage.setItem('userName', response.userName);
          }
          this.setLoggedIn(true);
        }
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, { username, password });
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('userName');
    }
    this.setLoggedIn(false);
  }

  getUserName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
  }

  getUserId(): number | null {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('id') : null;
    return userId ? Number(userId) : null; // Convert userId to number
  }

  // Add this method to get the token
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }
}













