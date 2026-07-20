import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Curso as CursoService, CursoDTO } from '../../services/curso';
import { InscripcionService } from '../../services/inscripcion';

@Component({
  selector: 'app-dashboard-docente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" role="navigation" aria-label="Navegación del docente">
      <div class="container">
        <a routerLink="/" class="navbar-brand">
          <div class="brand-icon" aria-hidden="true">🎓</div>
          <span>Edu<em>Tech</em> <span style="font-size:var(--text-xs);font-weight:700;background:var(--warning-500);color:var(--gray-900);padding:2px 8px;border-radius:var(--border-radius-full);">DOCENTE</span></span>
        </a>
        <ul class="navbar-nav" role="list">
          <li><a routerLink="/dashboard-docente" class="active">Inicio</a></li>
          <li><a routerLink="/mis-cursos-docente">Mis Cursos</a></li>
          <li><a routerLink="/mis-alumnos">Mis Alumnos</a></li>
        </ul>
        <div class="navbar-actions">
          <div class="navbar-user">
            <div class="avatar" style="background:linear-gradient(135deg,var(--warning-500),var(--primary-600));">
              {{ currentUser?.nombre?.substring(0,2)?.toUpperCase() }}
            </div>
            <span style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);">{{ currentUser?.nombre }}</span>
          </div>
          <button class="btn btn-ghost" (click)="logout()">Cerrar sesión</button>
        </div>
      </div>
    </nav>

    <div class="page-content" style="max-width:1200px; margin: 0 auto; padding: var(--space-6);">
      <div class="page-header" style="margin-bottom: var(--space-8);">
        <h1 class="page-title">¡Hola, {{ currentUser?.nombre }}! 👋</h1>
        <p class="page-subtitle">Bienvenido a tu panel de docente. Aquí puedes ver el resumen de tus cursos y estudiantes.</p>
      </div>

      <div class="grid grid-3" style="margin-bottom: var(--space-8);">
        <div class="stat-card">
          <div class="stat-icon purple">📚</div>
          <div class="stat-content">
            <div class="stat-label">Mis Cursos</div>
            <div class="stat-value">{{ cursos.length }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue">👥</div>
          <div class="stat-content">
            <div class="stat-label">Total Estudiantes</div>
            <div class="stat-value">{{ inscripciones.length }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">⭐</div>
          <div class="stat-content">
            <div class="stat-label">Valoración</div>
            <div class="stat-value">4.8</div>
          </div>
        </div>
      </div>

      <h2 style="font-size: var(--text-xl); font-weight: 700; margin-bottom: var(--space-4);">Tus últimos cursos</h2>
      <div class="grid grid-3">
        <div class="card" *ngFor="let curso of cursos.slice(0,3)" style="padding: var(--space-5);">
          <div class="badge badge-success" style="margin-bottom: var(--space-2);">{{ curso.categoria }}</div>
          <h3 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: var(--space-2);">{{ curso.titulo }}</h3>
          <p style="color: var(--gray-600); font-size: var(--text-sm); margin-bottom: var(--space-4);">{{ curso.horas }} horas • {{ curso.modalidad }}</p>
          <a routerLink="/mis-alumnos" class="btn btn-primary" style="width: 100%; display: block; text-align: center;">Ver estudiantes</a>
        </div>
        <div *ngIf="cursos.length === 0" style="grid-column: span 3; text-align: center; padding: var(--space-8); color: var(--gray-500); background: var(--gray-50); border-radius: var(--border-radius-lg);">
          No tienes cursos asignados actualmente.
        </div>
      </div>
    </div>
  `
})
export class DashboardDocente implements OnInit {
  currentUser: any = null;
  cursos: CursoDTO[] = [];
  inscripciones: any[] = [];

  constructor(
    private authService: AuthService,
    private cursoService: CursoService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      const nombreCompleto = `${this.currentUser.nombre} ${this.currentUser.apellidos || ''}`.trim();
      
      this.cursoService.listarCursosDocente(nombreCompleto).subscribe({
        next: (cursos) => this.cursos = cursos
      });

      this.inscripcionService.inscripcionesPorDocente(nombreCompleto).subscribe({
        next: (inscripciones) => this.inscripciones = inscripciones
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
