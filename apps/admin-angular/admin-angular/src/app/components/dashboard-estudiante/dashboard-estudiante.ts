import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InscripcionService, InscripcionDTO } from '../../services/inscripcion';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.css',
})
export class DashboardEstudiante implements OnInit {
  currentUser: any = null;
  isMenuOpen = false;

  inscripciones: InscripcionDTO[] = [];
  cargandoInscripciones = true;

  constructor(
    private authService: AuthService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarInscripciones();
  }

  cargarInscripciones() {
    if (!this.currentUser?.id) {
      this.cargandoInscripciones = false;
      return;
    }
    this.cargandoInscripciones = true;
    this.inscripcionService.misInscripciones(this.currentUser.id).subscribe({
      next: (inscripciones) => {
        this.inscripciones = inscripciones;
        this.cargandoInscripciones = false;
      },
      error: () => {
        this.inscripciones = [];
        this.cargandoInscripciones = false;
      },
    });
  }

  get totalCursos(): number {
    return this.inscripciones.length;
  }

  get totalCompletados(): number {
    return this.inscripciones.filter((i) => i.estado === 'completado').length;
  }

  get totalHoras(): number {
    return 0; // horas no está desnormalizado en inscripciones
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
