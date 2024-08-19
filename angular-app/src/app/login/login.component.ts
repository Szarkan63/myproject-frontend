import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Specify this is a standalone component
  imports: [FormsModule] // Import FormsModule in standalone component
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const token = response.token; // Adjust based on your backend response
        if (token) {
          localStorage.setItem('token', token);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/dashboard']); // Redirect to a protected route
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Login error', error);
      }
    );
  }
}






