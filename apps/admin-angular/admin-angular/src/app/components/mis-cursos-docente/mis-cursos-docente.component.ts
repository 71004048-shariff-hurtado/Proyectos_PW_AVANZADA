import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Curso as CursoService, CursoDTO } from '../../services/curso';

@Component({
  selector: 'app-mis-cursos-docente',
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
          <li><a routerLink="/mis-cursos-docente" class="active">Mis Cursos</a></li>
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
        <h1 class="page-title">Mis Cursos Asignados</h1>
        <p class="page-subtitle">Estos son los cursos que impartes en la plataforma.</p>
      </div>

      <div *ngIf="cargando" style="text-align: center; padding: var(--space-12); color: var(--gray-500);">
        ⏳ Cargando cursos...
      </div>

      <div class="grid grid-3" *ngIf="!cargando">
        <div class="card" *ngFor="let curso of cursos" style="display: flex; flex-direction: column;">
          <div class="card-image" style="background: linear-gradient(135deg, var(--primary-600), var(--warning-500)); height: 140px; border-radius: var(--border-radius) var(--border-radius) 0 0; margin: calc(var(--space-6) * -1) calc(var(--space-6) * -1) var(--space-4); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
            📚
          </div>
          <span class="badge badge-success" style="align-self: flex-start; margin-bottom: var(--space-2);">{{ curso.categoria }}</span>
          <h3 style="font-size: var(--text-lg); font-weight: 600; margin-bottom: var(--space-2);">{{ curso.titulo }}</h3>
          <p style="color: var(--gray-600); font-size: var(--text-sm); margin-bottom: var(--space-4); flex-grow: 1;">{{ curso.descripcion }}</p>
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--gray-200); padding-top: var(--space-4); margin-bottom: var(--space-4); font-size: var(--text-sm); color: var(--gray-600);">
            <span>⏱️ {{ curso.horas }}h</span>
            <span>📍 {{ curso.modalidad }}</span>
          </div>

          <a routerLink="/mis-alumnos" class="btn btn-ghost" style="width: 100%; display: block; text-align: center;">Gestionar estudiantes</a>
        </div>
        
        <div *ngIf="cursos.length === 0" style="grid-column: span 3; text-align: center; padding: var(--space-8); color: var(--gray-500); background: var(--gray-50); border-radius: var(--border-radius-lg);">
          <div style="font-size: 3rem; margin-bottom: var(--space-4);">📭</div>
          <h3 style="font-size: var(--text-lg); font-weight: 600; color: var(--gray-900); margin-bottom: var(--space-2);">No hay cursos asignados</h3>
          <p>Aún no has sido asignado como docente en ningún curso activo.</p>
        </div>
      </div>
    </div>
  `
})
export class MisCursosDocente implements OnInit {
  currentUser: any = null;
  cursos: CursoDTO[] = [];
  cargando = true;

  constructor(
    private authService: AuthService,
    private cursoService: CursoService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      const nombreCompleto = `${this.currentUser.nombre} ${this.currentUser.apellidos || ''}`.trim();
      this.cursoService.listarCursosDocente(nombreCompleto).subscribe({
        next: (cursos) => {
          this.cursos = cursos;
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
