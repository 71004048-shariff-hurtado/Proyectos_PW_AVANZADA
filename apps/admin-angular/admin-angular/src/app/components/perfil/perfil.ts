import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InscripcionService, InscripcionDTO } from '../../services/inscripcion';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  currentUser: any = null;
  isMenuOpen = false;

  inscripciones: InscripcionDTO[] = [];

  constructor(
    private authService: AuthService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser?.id) {
      this.inscripcionService.misInscripciones(this.currentUser.id).subscribe({
        next: (inscripciones) => (this.inscripciones = inscripciones),
        error: () => (this.inscripciones = []),
      });
    }
  }

  get totalCursos(): number {
    return this.inscripciones.length;
  }

  get totalCompletados(): number {
    return this.inscripciones.filter((i) => i.estado === 'completado').length;
  }

  get totalHoras(): number {
    return 0; // horas no está desnormalizado en el modelo de inscripción
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
