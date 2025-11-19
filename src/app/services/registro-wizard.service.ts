import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroWizardService {

  private data: any = {
    usuario: null, 
    datosNutricionales: null,
    actividadFisica: null,
    objetivoNutricional: null,
  };

  constructor() {}

  // Guarda los datos de un paso
  setStepData(stepName: string, stepData: any) {
    this.data[stepName] = stepData;
  }

  // Obtiene los datos de un paso
  getStepData(stepName: string) {
    return this.data[stepName];
  }

  // Obtiene todo el resumen
  getData() {
    return this.data;
  }

  // Limpia 
  reset() {
    this.data = {
      datosNutricionales: null,
      actividadFisica: null,
      objetivoNutricional: null,
    };
  }
}
