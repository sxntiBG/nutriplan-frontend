import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';


@Component({
  selector: 'app-progress-bar-component',
   standalone: true, 
  imports: [CommonModule, NavbarComponent],
  templateUrl: './progress-bar-component.html',
  
})
export class ProgressBarComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 5;

  get steps(): number[] {
    return Array.from({ length: this.totalSteps }, (_, i) => i + 1);
  }
}
