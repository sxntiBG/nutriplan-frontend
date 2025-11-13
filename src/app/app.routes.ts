import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index';
import { LoginComponent } from './pages/login/login'
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' }
];
