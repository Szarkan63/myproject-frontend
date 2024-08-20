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
    if (userId) {
      this.loadUserVehicles(userId);
    }
  }

  deleteVehicle(vehicleId: number): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      console.log('Attempting to delete vehicle with ID:', vehicleId); // Debug log

      this.apiService.deleteVehicle(vehicleId).subscribe(() => {
        const userId = this.userInfo?.id;
        if (userId) {
          this.loadUserVehicles(userId); // Reload the list after deletion
        }
      }, error => {
        console.error('Error deleting vehicle:', error);
      });
    }
  }

  loadUserVehicles(userId: number) {
    this.apiService.getUserVehicles(userId).subscribe((vehicles: Vehicle[]) => {
      this.userVehicles = vehicles;
      console.log('User vehicles:', vehicles);
    });
  }
}





