import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/vehicles/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Retrieve token from AuthService
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getVehicles(): Observable<Vehicle[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Vehicle[]>(this.apiUrl, { headers });
  }

  getOneVehicle(id: number): Observable<Vehicle> {
    const headers = this.getAuthHeaders();
    return this.http.get<Vehicle>(`${this.apiUrl}${id}/`, { headers });
  }

  updateVehicle(id: number, formData: FormData): Observable<Vehicle> {
    const headers = this.getAuthHeaders();
    return this.http.put<Vehicle>(`${this.apiUrl}${id}/`, formData, { headers });
  }

  createVehicle(vehicle: FormData): Observable<Vehicle> {
    const headers = this.getAuthHeaders();
    return this.http.post<Vehicle>(this.apiUrl, vehicle, { headers });
  }

  deleteVehicle(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers });
  }
}

export interface Vehicle {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engine_capacity: number;
  power: number;
  fuel_type: string;
  photo: string;
  date_added: string;
  date_published: string;
  user: number;
}










