import { Component, OnInit } from '@angular/core';
import { RegistroWizardService } from 'src/app/services/registro-wizard.service';
import { ResumenService } from 'src/app/services/resumen.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.html',
  styleUrl: './resumen.css',
})
export class Resumen implements OnInit {
  datos: any = {
    datosNutricionales: {},
    factorActividad: null,
    objetivoNutricional: null,
    usuario: null,
  };

  constructor(
    private registroWizardService: RegistroWizardService,
    private resumenService: ResumenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.datos = this.registroWizardService.getData();
    console.log('Resumen cargado:', this.datos);

    // Asigna automáticamente el usuario logueado
    const usuarioLogueado = this.authService.getUserData();
    if (usuarioLogueado) {
      this.datos.usuario = { id: usuarioLogueado.id };
    }
  }

  guardar() {
    const payload = {
      usuario: this.datos.usuario,
      pesoKg: this.datos.datosNutricionales.peso,
      estaturaCm: this.datos.datosNutricionales.estatura,
      edad: this.datos.datosNutricionales.edad,
      genero: this.datos.datosNutricionales.genero,
      actividad: { id: this.datos.actividadFisica.factorActividad },
      fechaRegistro: this.datos.datosNutricionales.fechaRegistro + 'T00:00:00',
    };

    console.log('JSON a enviar:', JSON.stringify(payload, null, 2));

    this.resumenService.guardarDatos(payload).subscribe({
      next: (resp) => {
        console.log('Datos nutricionales guardados:', resp);

        Swal.fire({
          title: '¡Guardado!',
          text: 'Los datos nutricionales se han guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Continuar',
        }).then(() => {
          // Construir JSON para generar plan
          const planPayload = {
            usuario: { id: this.datos.usuario.id },
            objetivo: { id: this.datos.objetivoNutricional.objetivoNutricional },
          };

          console.log('🔎 JSON que se está enviando al backend:');
          console.log(JSON.stringify(planPayload, null, 2));

          this.resumenService.generarPlanUsuario(planPayload).subscribe({
            next: (resp2) => {
              console.log('Plan generado correctamente:', resp2);

              Swal.fire({
                title: '¡Plan creado!',
                text: 'Tu plan nutricional se ha generado correctamente.',
                icon: 'success',
                confirmButtonText: 'Ver plan',
              }).then(() => {
                // Redirigir a /plan
                window.location.href = '/plan';
              });
            },
            error: (err2) => {
              console.error('Error al generar el plan:', err2);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un problema al generar el plan.',
                icon: 'error',
              });
            },
          });
        });
      },
      error: (err) => {
        console.error('Error al guardar datos nutricionales:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron guardar los datos nutricionales.',
          icon: 'error',
        });
      },
    });
  }
}
