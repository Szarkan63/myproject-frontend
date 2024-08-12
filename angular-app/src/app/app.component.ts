import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Vehicle } from './api.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, HttpClient],
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  selectedVehicle: Vehicle | null = null;
  vehicles: Vehicle[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getVehicles().subscribe((data: Vehicle[]) => {
      this.vehicles = data;
    });
  }

  vehicleClicked(vehicle: Vehicle) {
    console.log(vehicle);
    this.apiService.getOneVehicle(vehicle.id).subscribe((data: Vehicle) => {
      this.selectedVehicle = data;
    });
  }

  updateVehicle = () => {
  if (this.selectedVehicle) {
    this.apiService.updateVehicle(this.selectedVehicle).subscribe(
      (updatedVehicle: Vehicle) => {
        console.log('Vehicle updated:', updatedVehicle);
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
}

}

