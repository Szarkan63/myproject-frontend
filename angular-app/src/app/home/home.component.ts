import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Dodaj ten import, jeśli go brakuje
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RouterModule]
})

export class HomeComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();  // Retrieve username from AuthService
  }
   logout() {
    // Wylogowanie użytkownika
    this.authService.logout();
    this.router.navigate(['/login']);  // Przekierowanie na stronę logowania
  }
}