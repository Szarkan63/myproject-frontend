import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  private http = inject(HttpClient);
  private router = inject(Router);

  register() {
    this.http.post('http://localhost:8000/api/users/register/', { username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']); // Redirect to login or another route
        },
        (error: HttpErrorResponse) => {
          console.error('Registration error', error);
        }
      );
  }
}



