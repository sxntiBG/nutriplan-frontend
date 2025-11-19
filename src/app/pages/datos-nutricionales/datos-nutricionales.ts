import { Component,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-nutricionales',
  imports: [FormsModule],
  templateUrl: './datos-nutricionales.html',
  styleUrl: './datos-nutricionales.css',
})
export class DatosNutricionales {
  @Output() onNext = new EventEmitter<any>();

  datos = {
    peso: null,
    estatura: null,
    edad: null,
    genero: '',
    fechaRegistro: ''
  };

  siguiente() {
    this.onNext.emit(this.datos);
  }

}
