import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

//Servicio para obtener los datos de los objetivos
@Injectable({ providedIn: 'root' })
export class ObjetivoNutricionalService {

  private apiUrl = `${environment.apiUrl}/objetivos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(this.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}
