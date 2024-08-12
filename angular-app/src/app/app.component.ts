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
createVehicle() {
  const formData: FormData = new FormData();

  formData.append('title', 'Sprzedam Porsche 911');
  formData.append('description', 'Sprzedam Porsche, stan idealny.');
  formData.append('category', 'osobowy');
  formData.append('brand', 'Porsche');
  formData.append('model', '911');
  formData.append('year', '2020');
  formData.append('mileage', '10000');
  formData.append('engine_capacity', '3000');
  formData.append('power', '450');
  formData.append('fuel_type', 'benzyna');

  // Handle the possibility of null
  const fileInput = document.querySelector('#photo') as HTMLInputElement | null;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append('photo', fileInput.files[0]);
  }

  formData.append('user', '1');

  this.apiService.createVehicle(formData).subscribe(
    (createdVehicle: Vehicle) => {
      console.log('Vehicle created:', createdVehicle);
      this.vehicles.push(createdVehicle);
    },
    (error) => {
      console.error('Creation failed:', error);
    }
  );
}



}

