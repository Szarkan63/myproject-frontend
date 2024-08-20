import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AddAdComponent } from '../add-ad/add-ad.component';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  standalone: true,
  imports: [CommonModule, AddAdComponent]
})
export class AdsComponent {
  isFormVisible = false; // Początkowo formularz jest niewidoczny
  userInfo: { id: number | null, userName: string | null } | null = null; // User info to display

  constructor(private authService: AuthService) {}

  toggleForm() {
    this.isFormVisible = !this.isFormVisible; // Przełącz widoczność formularza
  }

  showUserInfo() {
    const userId = this.authService.getUserId();
    const userName = this.authService.getUserName();

    // Debugging
    console.log(`User ID: ${userId}`);
    console.log(`User Name: ${userName}`);

    // Update userInfo property
    this.userInfo = { id: userId, userName };
  }
}

