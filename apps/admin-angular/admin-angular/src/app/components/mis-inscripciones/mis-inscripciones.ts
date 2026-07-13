import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Inscripcion {
  icono: string;
  colorFondo: string;
  titulo: string;
  categoria: string;
  horas: number;
  docente: string;
  fechaInscripcion: string;
  modalidad: string;
  progreso: number;
  estado: 'progreso' | 'completado';
}

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

  inscripciones: Inscripcion[] = [
    {
      icono: '⚡',
      colorFondo: 'linear-gradient(135deg,#1a1a2e,#7c3aed)',
      titulo: 'Desarrollo Frontend con React',
      categoria: 'Full Stack',
      horas: 60,
      docente: 'María Torres',
      fechaInscripcion: '15 feb 2024',
      modalidad: 'Virtual',
      progreso: 72,
      estado: 'progreso',
    },
    {
      icono: '🚀',
      colorFondo: 'linear-gradient(135deg,#064e3b,#059669)',
      titulo: 'Backend con Node.js',
      categoria: 'Backend',
      horas: 55,
      docente: 'Luis Ramírez',
      fechaInscripcion: '01 mar 2024',
      modalidad: 'Virtual',
      progreso: 38,
      estado: 'progreso',
    },
    {
      icono: '⚛️',
      colorFondo: 'linear-gradient(135deg,#1e3a5f,#2563eb)',
      titulo: 'Programación Web II',
      categoria: 'Frontend',
      horas: 40,
      docente: 'Juan Pérez',
      fechaInscripcion: '10 ene 2024',
      modalidad: 'Híbrida',
      progreso: 100,
      estado: 'completado',
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  get inscripcionesFiltradas(): Inscripcion[] {
    if (this.filtroActivo === 'todos') return this.inscripciones;
    return this.inscripciones.filter((i) => i.estado === this.filtroActivo);
  }

  get totalEnProgreso(): number {
    return this.inscripciones.filter((i) => i.estado === 'progreso').length;
  }

  get totalCompletados(): number {
    return this.inscripciones.filter((i) => i.estado === 'completado').length;
  }

  setFiltro(filtro: 'todos' | 'progreso' | 'completado') {
    this.filtroActivo = filtro;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
