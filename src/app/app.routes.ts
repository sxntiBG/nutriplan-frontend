import { Routes } from '@angular/router';
import { Index } from './pages/index/index';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Settings } from './pages/settings/settings';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { RegistroWizard } from './shared/components/registro-wizard/registro-wizard';

export const routes: Routes = [
  { path: '', component: Index },
  {
    path: 'login',
    component: Login,
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        // Solo redirige si el token es válido y no ha expirado
        if (authService.isLoggedIn()) {
          router.navigate(['/settings']);
          return false;
        }
        return true;
      },
    ],
  },
  { path: 'register', component: Register },
  { path:'registro-datos', component:RegistroWizard},
  { path: 'settings', component: Settings, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
