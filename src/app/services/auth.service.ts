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

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('correo', res.correo);
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
}
