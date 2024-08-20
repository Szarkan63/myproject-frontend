import { Component } from '@angular/core';
import { AddAdComponent } from '../add-ad/add-ad.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  standalone: true,
  imports: [AddAdComponent, CommonModule]
})
export class AdsComponent {
  isFormVisible = false; // Początkowo formularz jest niewidoczny

  toggleForm() {
    this.isFormVisible = !this.isFormVisible; // Przełącz widoczność formularza
  }
}

