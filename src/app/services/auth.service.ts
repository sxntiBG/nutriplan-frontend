import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  correo: string;
  token: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private userKey = 'userData';

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.setUserData({
          id: res.id,
          nombre: res.nombre,
          correo: res.correo
        });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  /** Verifica si el token es válido y no está expirado */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) return false;

      const exp = payload.exp * 1000;
      return Date.now() < exp; // true solo si no ha expirado
    } catch (e) {
      console.error('Token inválido:', e);
      return false;
    }
  }

   // Guarda los datos del usuario al hacer login
  setUserData(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Obtiene los datos del usuario actual
  getUserData() {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  // Limpia los datos al cerrar sesión
  clearUserData() {
    localStorage.removeItem(this.userKey);
  }
}
