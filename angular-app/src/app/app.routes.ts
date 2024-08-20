import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AdsComponent } from './ads/ads.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { HomePageComponent } from './home-page/home-page.component'; // Importuj nowy komponent

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePageComponent }, // Ustaw komponent HomePage jako domyślny dla /home
      { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
      { path: 'ads/add', component: AddAdComponent, canActivate: [AuthGuard] }
    ]
  }
];




