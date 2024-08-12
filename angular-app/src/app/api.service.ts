import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/vehicles/';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.get<Vehicle[]>(this.apiUrl, { headers });
  }

  getOneVehicle(id: number): Observable<Vehicle> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.get<Vehicle>(`${this.apiUrl}${id}/`, { headers });
  }

updateVehicle(id: number, formData: FormData): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}${id}/`, formData);
  }
createVehicle(vehicle: FormData): Observable<Vehicle> {
  return this.http.post<Vehicle>(this.apiUrl, vehicle);
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




