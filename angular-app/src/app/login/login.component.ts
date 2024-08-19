

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  this.authService.login(this.username, this.password).subscribe(
    (response: any) => {
      const token = response.token;
      if (token) {
        localStorage.setItem('token', token);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/home']);
      } else {
        console.error('Token not found in response:', response);
      }
    },
    (error: HttpErrorResponse) => {
      console.error('Login error', error);
    }
  );
}


}









