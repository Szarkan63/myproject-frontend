import { Component } from '@angular/core';
import { ApiService, Vehicle } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, HttpClientModule],
})
export class AddAdComponent {

  vehicle: Partial<Vehicle> = {};
  selectedFile: File | null = null;

  constructor(private apiService: ApiService, private router: Router,private authService: AuthService) { }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
  const formData = new FormData();
  formData.append('title', this.vehicle.title || '');
  formData.append('description', this.vehicle.description || '');
  formData.append('category', this.vehicle.category || '');
  formData.append('brand', this.vehicle.brand || '');
  formData.append('model', this.vehicle.model || '');
  formData.append('year', this.vehicle.year?.toString() || '');
  formData.append('mileage', this.vehicle.mileage?.toString() || '');
  formData.append('engine_capacity', this.vehicle.engine_capacity?.toString() || '');
  formData.append('power', this.vehicle.power?.toString() || '');
  formData.append('fuel_type', this.vehicle.fuel_type || '');

  const userId = this.authService.getUserId();
  if (userId !== null && userId !== undefined) {
    formData.append('user', userId.toString());  // Ensure userId is a string
  }

  if (this.selectedFile) {
    formData.append('photo', this.selectedFile);
  }

  this.apiService.createVehicle(formData).subscribe(
    response => {
      console.log('Ogłoszenie dodane:', response);
      this.router.navigate(['/home/ads']);  // Przekierowanie do listy ogłoszeń
    },
    error => {
      console.error('Błąd podczas dodawania ogłoszenia:', error);
      console.error(userId)
    }
  );
}



}

