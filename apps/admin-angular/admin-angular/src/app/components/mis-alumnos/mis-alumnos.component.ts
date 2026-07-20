import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InscripcionService } from '../../services/inscripcion';

@Component({
  selector: 'app-mis-alumnos',
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
          <li><a routerLink="/dashboard-docente">Inicio</a></li>
          <li><a routerLink="/mis-cursos-docente">Mis Cursos</a></li>
          <li><a routerLink="/mis-alumnos" class="active">Mis Alumnos</a></li>
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
        <h1 class="page-title">Estudiantes Inscritos</h1>
        <p class="page-subtitle">Lista de todos los estudiantes inscritos en tus cursos.</p>
      </div>

      <div *ngIf="cargando" style="text-align: center; padding: var(--space-12); color: var(--gray-500);">
        ⏳ Cargando alumnos...
      </div>

      <div class="table-wrapper" *ngIf="!cargando">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Estudiante</th>
              <th scope="col">Curso inscrito</th>
              <th scope="col">Programa académico</th>
              <th scope="col">Progreso</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ins of inscripciones">
              <td>
                <div class="user-cell">
                  <div class="avatar" style="background: var(--gray-200); color: var(--gray-700);">
                    {{ ins.estudianteId?.nombre?.substring(0,1) }}{{ ins.estudianteId?.apellidos?.substring(0,1) }}
                  </div>
                  <div class="user-info">
                    <div class="name">{{ ins.estudianteId?.nombre }} {{ ins.estudianteId?.apellidos }}</div>
                    <div class="sub">{{ ins.estudianteId?.correo_electronico }}</div>
                  </div>
                </div>
              </td>
              <td style="font-weight: 500;">{{ ins.nombreCurso }}</td>
              <td>{{ ins.estudianteId?.programa_academico || 'No especificado' }}</td>
              <td>
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                  <div style="flex-grow: 1; height: 6px; background: var(--gray-200); border-radius: 3px; overflow: hidden;">
                    <div [style.width.%]="ins.progreso || 0" style="height: 100%; background: var(--primary-500); border-radius: 3px;"></div>
                  </div>
                  <span style="font-size: var(--text-xs); font-weight: 600; color: var(--gray-600); width: 35px;">{{ ins.progreso || 0 }}%</span>
                </div>
              </td>
              <td>
                <span class="badge" [class.badge-success]="ins.estado === 'completado'" [class.badge-primary]="ins.estado !== 'completado'">
                  {{ ins.estado === 'completado' ? 'Completado' : 'En progreso' }}
                </span>
              </td>
            </tr>
            <tr *ngIf="inscripciones.length === 0">
              <td colspan="5" style="text-align: center; padding: var(--space-8); color: var(--gray-500);">
                No hay estudiantes inscritos en tus cursos actualmente.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class MisAlumnosComponent implements OnInit {
  currentUser: any = null;
  inscripciones: any[] = [];
  cargando = true;

  constructor(
    private authService: AuthService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      const nombreCompleto = `${this.currentUser.nombre} ${this.currentUser.apellidos || ''}`.trim();
      this.inscripcionService.inscripcionesPorDocente(nombreCompleto).subscribe({
        next: (data) => {
          this.inscripciones = data;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
