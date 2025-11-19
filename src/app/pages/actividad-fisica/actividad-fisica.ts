import { Component , EventEmitter, Output} from '@angular/core';
import { ActividadFisicaService } from 'src/app/services/actividad-fisica.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-actividad-fisica',
  imports: [FormsModule,CommonModule],
  templateUrl: './actividad-fisica.html',
  styleUrl: './actividad-fisica.css',
})
export class ActividadFisica {
   @Output() onNext = new EventEmitter<any>();

  actividades: any[] = [];

  datos = {
    factorActividad: null
  };

  constructor(private actividadFisicaService: ActividadFisicaService){}

  ngOnInit() {
    this.actividadFisicaService.getAll().subscribe(res => {
      this.actividades = res;
    });
  }

  siguiente() {
    if (!this.datos.factorActividad) {
      alert("Debes seleccionar un nivel de actividad física.");
      return;
    }
    this.onNext.emit(this.datos);
  }
}