import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log('Intentando iniciar sesión...');

    if (this.loginForm.invalid) return;

    const { correo, contrasena } = this.loginForm.value;
    console.log('Datos enviados:', { correo, contrasena });

    this.authService.login(correo, contrasena).subscribe({
      next: (res) => {
        console.log('Inicio de sesión exitoso:', res);

        // OBTENER ID DEL USUARIO
        const userId = this.authService.getUserId();
        if (!userId) {
          console.error('No se pudo obtener el ID del usuario');
          return;
        }

        // CONSULTAR LOS DATOS DEL USUARIO
        this.authService.getUserById(userId).subscribe({
          next: (usuario) => {
            console.log('Datos del usuario recibidos:', usuario);

            const datos = usuario.datosNutricionales;

            // VALIDAR SI ESTÁ VACÍO
            if (!datos || datos.length === 0) {
              this.router.navigate(['/registro-datos']);
            } else {
              this.router.navigate(['/plan']);
            }
          },
          error: (err) => {
            console.error('Error obteniendo datos del usuario:', err);
            this.router.navigate(['/registro-datos']);
          },
        });
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      },
    });
  }
}
