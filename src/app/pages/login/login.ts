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
    console.log('Intentando iniciar sesión...'); // Agregado

    if (this.loginForm.invalid) return;

    const { correo, contrasena } = this.loginForm.value;
    console.log('Datos enviados:', { correo, contrasena }); // Agregado

    this.authService.login(correo, contrasena).subscribe({
      next: (res) => {
        console.log('Inicio de sesión exitoso:', res);
        this.router.navigate(['/settings']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      },
    });
  }
}
