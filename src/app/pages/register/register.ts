import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@environments/environment';

interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: any;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  // Base URL global del backend
  private readonly apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmarContrasena: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // ✅ Validador personalizado de fuerza de contraseña
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber;

    return !passwordValid ? { weakPassword: true } : null;
  }

  // ✅ Verifica que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contrasena');
    const confirmPassword = form.get('confirmarContrasena');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    if (this.registerForm.hasError('passwordMismatch')) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;

    const registerData: RegisterRequest = {
      nombre: this.registerForm.value.nombre,
      correo: this.registerForm.value.correo,
      contrasena: this.registerForm.value.contrasena
    };

    this.http.post<RegisterResponse>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('✅ Registro exitoso:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Error en el registro:', error);

        if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Datos inválidos. Por favor, verifica la información.';
        } else if (error.status === 409) {
          this.errorMessage = 'Este correo electrónico ya está registrado.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error en el servidor. Por favor, intenta más tarde.';
        } else {
          this.errorMessage = 'Error al crear la cuenta. Por favor, intenta nuevamente.';
        }
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters para acceder fácilmente a los controles
  get nombre() { return this.registerForm.get('nombre'); }
  get correo() { return this.registerForm.get('correo'); }
  get contrasena() { return this.registerForm.get('contrasena'); }
  get confirmarContrasena() { return this.registerForm.get('confirmarContrasena'); }
}
