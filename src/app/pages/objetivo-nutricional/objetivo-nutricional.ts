import { Component, Output, EventEmitter } from '@angular/core';
import { ObjetivoNutricionalService } from 'src/app/services/objetivo-nutricional.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-objetivo-nutricional',
  imports: [CommonModule, FormsModule],
  templateUrl: './objetivo-nutricional.html',
  styleUrl: './objetivo-nutricional.css',
})
export class ObjetivoNutricional {
   @Output() onNext = new EventEmitter<any>();

  objetivos: any[] = [];

  datos = {
    objetivoNutricional: null
  };

  constructor(private objetivoNutricionalService: ObjetivoNutricionalService){}

  ngOnInit() {
    this.objetivoNutricionalService.getAll().subscribe(res=>{
      this.objetivos = res;
    })
  }

  siguiente() {
    if (!this.datos.objetivoNutricional) {
      alert("Debes seleccionar un objetivo");
      return;
    }
    this.onNext.emit(this.datos);
  }

}
