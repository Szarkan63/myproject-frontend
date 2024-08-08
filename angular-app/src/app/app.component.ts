import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ApiService ,Vehicle} from './api.service';
import {HttpClient} from "@angular/common/http";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService,HttpClient],
})
export class AppComponent implements OnInit {
  title='angular-app';

  vehicles: Vehicle[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getVehicles().subscribe((data: Vehicle[]) => {
      this.vehicles = data;
    });
  }
}
