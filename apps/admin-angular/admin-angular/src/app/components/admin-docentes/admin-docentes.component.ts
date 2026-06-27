import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-docentes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-docentes.component.html',
})
export class AdminDocentesComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
