import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

//Servicio para obtener los datos de actividad fisica
@Injectable({ providedIn: 'root' })
export class ActividadFisicaService {

  private apiUrl = `${environment.apiUrl}/actividad-fisica`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
