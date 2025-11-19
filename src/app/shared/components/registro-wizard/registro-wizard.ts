import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar-component/progress-bar-component';
import { DatosNutricionales } from '../../../pages/datos-nutricionales/datos-nutricionales';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar";  
import { ActividadFisica } from 'src/app/pages/actividad-fisica/actividad-fisica';
import { ObjetivoNutricional } from 'src/app/pages/objetivo-nutricional/objetivo-nutricional';

@Component({
  selector: 'app-registro-wizard',
  imports: [CommonModule, ProgressBarComponent, DatosNutricionales, NavbarComponent, ActividadFisica, ObjetivoNutricional],
  templateUrl: './registro-wizard.html',
  styleUrl: './registro-wizard.css',
})
export class RegistroWizard {
  pasoActual = 1;

  datosUsuario: any = {};

  siguiente(datosDelPaso?: any) {
    if (datosDelPaso) {
      this.datosUsuario = { ...this.datosUsuario, ...datosDelPaso };
    }
    this.pasoActual++;
  }

  anterior() {
    if (this.pasoActual > 1) this.pasoActual--;
  }

  guardar() {
    console.log('Datos finales a guardar:', this.datosUsuario);
    // Aquí llamas a tu servicio HTTP para guardar en la BD
  }

}
