import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InscripcionService, InscripcionDTO } from '../../services/inscripcion';

@Component({
  selector: 'app-mis-inscripciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-inscripciones.html',
  styleUrl: './mis-inscripciones.css',
})
export class MisInscripciones implements OnInit {
  currentUser: any = null;
  isMenuOpen = false;
  filtroActivo: 'todos' | 'progreso' | 'completado' = 'todos';

  inscripciones: InscripcionDTO[] = [];
  cargando = true;
  errorCarga = '';

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
      this.cargando = false;
      return;
    }
    this.cargando = true;
    this.errorCarga = '';
    this.inscripcionService.misInscripciones(this.currentUser.id).subscribe({
      next: (inscripciones) => {
        this.inscripciones = inscripciones;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudieron cargar tus inscripciones. Verifica que el servidor esté corriendo.';
        this.cargando = false;
      },
    });
  }

  get inscripcionesFiltradas(): InscripcionDTO[] {
    if (this.filtroActivo === 'todos') return this.inscripciones;
    return this.inscripciones.filter((i) => i.estado === this.filtroActivo);
  }

  get totalEnProgreso(): number {
    return this.inscripciones.filter((i) => i.estado === 'progreso').length;
  }

  get totalCompletados(): number {
    return this.inscripciones.filter((i) => i.estado === 'completado').length;
  }

  get totalHoras(): number {
    return this.inscripciones.reduce((suma, i) => suma + (i.cursoId?.horas || 0), 0);
  }

  get promedioAvance(): number {
    if (this.inscripciones.length === 0) return 0;
    const suma = this.inscripciones.reduce((acc, i) => acc + i.progreso, 0);
    return Math.round(suma / this.inscripciones.length);
  }

  setFiltro(filtro: 'todos' | 'progreso' | 'completado') {
    this.filtroActivo = filtro;
  }

  cancelarInscripcion(inscripcion: InscripcionDTO) {
    const confirmado = confirm(`¿Deseas darte de baja de "${inscripcion.cursoId?.titulo}"?`);
    if (!confirmado) return;

    this.inscripcionService.cancelar(inscripcion._id).subscribe({
      next: () => {
        this.inscripciones = this.inscripciones.filter((i) => i._id !== inscripcion._id);
      },
      error: () => {
        this.errorCarga = 'No se pudo cancelar la inscripción. Intenta de nuevo.';
      },
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
