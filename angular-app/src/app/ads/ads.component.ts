import { Component, OnInit } from '@angular/core';
import { ApiService, Vehicle } from '../api.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { AddAdComponent } from '../add-ad/add-ad.component';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  standalone: true,
  imports: [CommonModule, AddAdComponent]
})
export class AdsComponent implements OnInit {
  isFormVisible = false;
  userInfo: { id: number | null, userName: string | null } | null = null;
  allVehicles: Vehicle[] = [];
  userVehicles: Vehicle[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
    this.showUserInfo();
    if (this.userInfo?.id) { // Sprawdź, czy id jest dostępne
      this.loadUserVehicles(this.userInfo.id);
    }
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  showUserInfo() {
    const userId = this.authService.getUserId();
    const userName = this.authService.getUserName();

    console.log(`User ID: ${userId}`);
    console.log(`User Name: ${userName}`);

    this.userInfo = { id: userId, userName };
  }


  loadUserVehicles(userId: number) {
    this.apiService.getUserVehicles(userId).subscribe((vehicles: Vehicle[]) => { // Określ typ dla vehicles
      this.userVehicles = vehicles;
      console.log('User vehicles:', vehicles);
    });
  }
}



