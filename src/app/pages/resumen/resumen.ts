import { Component, OnInit } from '@angular/core';
import { RegistroWizardService } from 'src/app/services/registro-wizard.service';
import { ResumenService } from 'src/app/services/resumen.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.html',
  styleUrl: './resumen.css',
})
export class Resumen implements OnInit{
  datos: any = {
    datosNutricionales: {},
    factorActividad: null,
    objetivoNutricional: null,
    usuario: null
  }

  constructor(private registroWizardService: RegistroWizardService, private resumenService: ResumenService, private authService: AuthService) {}

  ngOnInit() {
    this.datos = this.registroWizardService.getData();
     console.log("Resumen cargado:", this.datos);

     // Asigna automáticamente el usuario logueado
    const usuarioLogueado = this.authService.getUserData();
    if (usuarioLogueado) {
      this.datos.usuario = { id: usuarioLogueado.id };
    }
  }

  guardar() {
   // Construye el payload exactamente como tu backend lo espera
    const payload = {
      usuario: this.datos.usuario,
      pesoKg: this.datos.datosNutricionales.peso,
      estaturaCm: this.datos.datosNutricionales.estatura,
      edad: this.datos.datosNutricionales.edad,
      genero: this.datos.datosNutricionales.genero,
      actividad: { id: this.datos.actividadFisica.factorActividad }, // si factorActividad representa el ID
      fechaRegistro: this.datos.datosNutricionales.fechaRegistro + 'T00:00:00'
    };

    console.log("JSON a enviar:", JSON.stringify(payload, null, 2));

  this.resumenService.guardarDatos(payload).subscribe({
    next: (resp) => {
      console.log("Guardado exitoso:", resp);
    },
    error: (err) => {
      console.error("Error al guardar:", err);
    }
  });
}
}
