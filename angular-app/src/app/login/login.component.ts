import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string | null = null; // Track login error message

  constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
  this.authService.login(this.username, this.password).subscribe(
    (response: any) => {
      const token = response.token;
      const userName = response.userName;
      if (token && userName) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/home']);
      } else {
        console.error('Token or userName not found in response:', response);
      }
    },
    (error: HttpErrorResponse) => {
      console.error('Login error', error);
    }
  );
}


}











