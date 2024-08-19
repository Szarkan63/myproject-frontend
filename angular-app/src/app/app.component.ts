import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Vehicle } from './api.service';
import { HttpClient } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Import your routes here
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

  deleteVehicle() {
  if (!this.selectedVehicle) {
    console.error('No vehicle selected for delete.');
    return;
  }


  if (!confirm('Are you sure you want to delete this vehicle?')) {
    return;
  }

  const selectedVehicle = this.selectedVehicle;


  this.apiService.deleteVehicle(selectedVehicle.id).subscribe(
    () => {
      console.log('Vehicle deleted:', selectedVehicle.id);
      this.vehicles = this.vehicles.filter(v => v.id !== selectedVehicle.id);
      this.selectedVehicle = null;
    },
    (error) => {
      console.error('Delete failed:', error);
    }
  );
}

  updateVehicle() {
  if (!this.selectedVehicle) {
    console.error('No vehicle selected for update.');
    return;
  }

  const formData: FormData = new FormData();
  formData.append('id', this.selectedVehicle.id.toString());
  formData.append('title', this.selectedVehicle.title);
  formData.append('description', this.selectedVehicle.description);
  formData.append('category', this.selectedVehicle.category);
  formData.append('brand', this.selectedVehicle.brand);
  formData.append('model', this.selectedVehicle.model);
  formData.append('year', this.selectedVehicle.year.toString());
  formData.append('mileage', this.selectedVehicle.mileage.toString());
  formData.append('engine_capacity', this.selectedVehicle.engine_capacity.toString());
  formData.append('power', this.selectedVehicle.power.toString());
  formData.append('fuel_type', this.selectedVehicle.fuel_type);

  const fileInput = document.querySelector('#photo2') as HTMLInputElement | null;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append('photo', fileInput.files[0]);
  }
  formData.append('date_added', this.selectedVehicle.date_added);
  formData.append('date_published', this.selectedVehicle.date_published);
  formData.append('user', this.selectedVehicle.user.toString());


  this.apiService.updateVehicle(this.selectedVehicle.id, formData).subscribe(
    (updatedVehicle: Vehicle) => {
      console.log('Vehicle updated:', updatedVehicle);
      const index = this.vehicles.findIndex(v => v.id === updatedVehicle.id);
      if (index !== -1) {
        this.vehicles[index] = updatedVehicle;
      }
    },
    (error) => {
      console.error('Update failed:', error);
    }
  );
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

