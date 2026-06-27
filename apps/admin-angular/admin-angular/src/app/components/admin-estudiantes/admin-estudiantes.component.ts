import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-estudiantes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-estudiantes.component.html',
})
export class AdminEstudiantesComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
