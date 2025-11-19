import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './plan.html',
  styleUrl: './plan.css',
})
export class Plan implements OnInit {

  userId: number | null = null;
  token: string | null = null;
  nombre: string | null = null;
  caloriasTotales: number | null = null;
  carbohidratosG: number | null = null;
  proteinasG: number | null = null;
  grasasG: number | null = null;
  fecha: Date | null = null;

  userData: any;
  planData: any;


  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.token = this.authService.getToken();
    this.userData = this.authService.getUserData();
    this.nombre = this.userData?.nombre;

    console.log("TOKEN:", this.token);
    console.log("USER ID:", this.userId);
    console.log("NOMBRE USER:", this.nombre);

    if (this.userId) {
      this.cargarPlan();
    } else {
      console.error("No hay ID del usuario. ¿Falló el login?");
    }
  }

  cargarPlan() {
    const url = `${environment.apiUrl}/plan-usuario/usuario/${this.userId}`;

    this.http.get(url).subscribe({
      next: (res) => {
        this.planData = res;
        const plan = this.planData[0];
        this.caloriasTotales = Number(plan.caloriasTotales.toFixed(2));
        this.carbohidratosG = Number(plan.carbohidratosG.toFixed(2));
        this.proteinasG = Number(plan.proteinasG.toFixed(2));
        this.grasasG = Number(plan.grasasG.toFixed(2));
        this.fecha = plan.fecha;
        console.log("Plan obtenido:", this.planData);
      },
      error: (err) => {
        console.error("Error al obtener el plan:", err);
      }
    });
  }
}