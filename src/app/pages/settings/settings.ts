import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings implements OnInit {
  userForm!: FormGroup;
  showSuccessMessage = false;
  showDeleteConfirmation = false;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });

    this.userData = this.authService.getUserData();
    if (this.userData) {
      this.userForm.patchValue({
        name: this.userData.nombre || '',
        email: this.userData.correo || '',
      });
    }
  }

  handleUpdateData(event: Event) {
    event.preventDefault();

    Swal.fire({
      title: '¿Deseas actualizar tus datos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = this.userForm.value;

        // Solo envía contraseña si fue ingresada
        const payload: any = {
          nombre: updatedData.name,
          correo: updatedData.email,
        };
        if (updatedData.password) {
          payload.contrasena = updatedData.password;
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.authService.getToken()}`,
        });

        this.http
          .put(`${environment.apiUrl}/usuarios/${this.userData.id}`, payload, { headers })
          .subscribe({
            next: (res) => {
              Swal.fire(
                '¡Actualizado!',
                'Tus datos han sido actualizados correctamente.',
                'success'
              );
              // Actualizamos el userData localStorage
              this.authService.setUserData({
                ...this.userData,
                nombre: updatedData.name,
                correo: updatedData.email,
              });
            },
            error: (err) => {
              console.error(err);
              Swal.fire('Error', 'No se pudieron actualizar los datos.', 'error');
            },
          });
      }
    });
  }

  handleDeleteAccount() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.authService.getToken()}`,
        });

        this.http
          .delete(`${environment.apiUrl}/usuarios/${this.userData.id}`, {
            headers,
            responseType: 'text', // evita que Angular intente parsear JSON
          })
          .subscribe({
            next: () => {
              Swal.fire('Eliminado', 'Usuario eliminado con éxito.', 'success');
              this.authService.logout(); // limpia token y redirige a /login
              this.router.navigate(['/']); // redirige al index
            },
            error: (err) => {
              console.error(err);
              Swal.fire('Error', 'No se pudo eliminar la cuenta.', 'error');
            },
          });
      }
    });
  }
}
