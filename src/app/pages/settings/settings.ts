import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './settings.html',
})
export class Settings {
  showSuccessMessage = false;
  showDeleteConfirmation = false;

  constructor(private router: Router) {}

  handleUpdateData(event: Event) {
    event.preventDefault();
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000);
  }

  handleDeleteAccount() {
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    this.showDeleteConfirmation = false;
    this.router.navigate(['/']); // redirige al home
  }
}
