import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';  // Guard chroniący stronę główną
import {RegisterComponent} from './register/register.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AppComponent, canActivate: [AuthGuard] },  // Strona główna chroniona przez Guard
  { path: 'register', component: RegisterComponent },  // Strona główna chroniona przez Guard
];

