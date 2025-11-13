import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token && !this.isTokenExpired(token)) {
      // Token válido → permitir acceso
      return true;
    } else {
      // Token inválido o ausente → redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }

  // ✅ Valida la expiración del token
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true; // Si el token no es válido, lo consideramos expirado
    }
  }
}
