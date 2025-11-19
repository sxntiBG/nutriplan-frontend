import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar-component/progress-bar-component';
import { DatosNutricionales } from '../../../pages/datos-nutricionales/datos-nutricionales';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar";  
import { ActividadFisica } from 'src/app/pages/actividad-fisica/actividad-fisica';
import { ObjetivoNutricional } from 'src/app/pages/objetivo-nutricional/objetivo-nutricional';
import { RegistroWizardService } from 'src/app/services/registro-wizard.service';
import { Resumen } from "src/app/pages/resumen/resumen";

@Component({
  selector: 'app-registro-wizard',
  imports: [CommonModule, ProgressBarComponent, DatosNutricionales, NavbarComponent, ActividadFisica, ObjetivoNutricional, Resumen],
  templateUrl: './registro-wizard.html',
  styleUrl: './registro-wizard.css',
})
export class RegistroWizard {
  pasoActual = 1;


  constructor(private wizardService: RegistroWizardService) {}
  siguiente(data: any) {
    // Guardar según el paso actual
    if (this.pasoActual === 1) {
      this.wizardService.setStepData("datosNutricionales", data);
    }
    

    if (this.pasoActual === 2) {
      this.wizardService.setStepData("actividadFisica", data);
    }

    if (this.pasoActual === 3) {
      this.wizardService.setStepData("objetivoNutricional", data);
    }

    // Avanzar paso
    this.pasoActual++;
  }

  anterior() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }
}
