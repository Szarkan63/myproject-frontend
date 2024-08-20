import { Component } from '@angular/core';
import { ApiService, Vehicle } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
})
export class AddAdComponent {
  vehicleForm: FormGroup;
  selectedFile: File | null = null;
  showMessage = false;
  formHidden = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // Initialize the form with validation rules
    this.vehicleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', [Validators.required, Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
      mileage: ['', [Validators.required, Validators.min(0), Validators.max(1500000)]],
      engine_capacity: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      power: ['', [Validators.required, Validators.min(0), Validators.max(2000)]],
      fuel_type: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.vehicleForm.patchValue({
        photo: this.selectedFile
      });
    }
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return;
    }

    const formData = new FormData();
    Object.keys(this.vehicleForm.value).forEach(key => {
      formData.append(key, this.vehicleForm.get(key)?.value || '');
    });

    const userId = this.authService.getUserId();
    if (userId !== null && userId !== undefined) {
      formData.append('user', userId.toString());
    }

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.apiService.createVehicle(formData).subscribe(
      response => {
        console.log('Ogłoszenie dodane:', response);
        this.showMessage = true; // Wyświetl komunikat
        this.formHidden = true;  // Ukryj formularz

        // Ukryj komunikat po 10 sekundach
        setTimeout(() => {
          this.showMessage = false;
          this.router.navigate(['/home/ads']); // Przekierowanie do listy ogłoszeń
        }, 10000);
      },
      error => {
        console.error('Błąd podczas dodawania ogłoszenia:', error);
      }
    );
  }

  get formControls() {
    return this.vehicleForm.controls;
  }
}



