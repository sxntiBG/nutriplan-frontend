import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

//Servicio para obtener los datos de los objetivos
@Injectable({ providedIn: 'root' })
export class ResumenService {
  private apiUrl = `${environment.apiUrl}/datos-nutricionales`;

  constructor(private http: HttpClient) {}

  guardarDatos(payload: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, payload, { headers });
  }

  generarPlanUsuario(payload: any) {
    return this.http.post(`${environment.apiUrl}/plan-usuario/generar`, payload);
  }
}
