import { Component, OnInit } from '@angular/core';
import { ApiService, Vehicle } from '../api.service'; // Upewnij się, że ścieżka jest poprawna
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [CommonModule]
})
export class HomePageComponent implements OnInit {
  vehicles: Vehicle[] = []; // Tablica do przechowywania pojazdów

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadVehicles(); // Pobierz pojazdy podczas inicjalizacji komponentu
  }

  loadVehicles(): void {
    this.apiService.getVehicles().subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data; // Przypisz pobrane pojazdy do zmiennej
      },
      error => {
        console.error('Wystąpił błąd podczas pobierania pojazdów:', error);
      }
    );
  }
}

