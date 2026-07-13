import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Curso as CursoService, CursoDTO } from '../../services/curso';
import { InscripcionService } from '../../services/inscripcion';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-explorar-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explorar-cursos.html',
  styleUrl: './explorar-cursos.css',
})
export class ExplorarCursos implements OnInit {
  currentUser: any = null;
  isMenuOpen = false;

  cursos: CursoDTO[] = [];
  cursosInscritosIds = new Set<string>();
  busqueda = '';

  cargando = true;
  errorCarga = '';

  inscribiendoId: string | null = null;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private cursoService: CursoService,
    private inscripcionService: InscripcionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.errorCarga = '';

    this.cursoService.listarCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudieron cargar los cursos. Verifica que el servidor esté corriendo.';
        this.cargando = false;
      },
    });

    if (this.currentUser?.id) {
      this.inscripcionService.misInscripciones(this.currentUser.id).subscribe({
        next: (inscripciones) => {
          this.cursosInscritosIds = new Set(inscripciones.map((i) => i.cursoId._id));
        },
        error: () => {
          // Si falla, simplemente no marcamos cursos como inscritos; el botón seguirá disponible.
        },
      });
    }
  }

  get cursosFiltrados(): CursoDTO[] {
    const termino = this.busqueda.trim().toLowerCase();
    if (!termino) return this.cursos;
    return this.cursos.filter(
      (c) =>
        c.titulo.toLowerCase().includes(termino) ||
        c.docente.toLowerCase().includes(termino) ||
        c.categoria.toLowerCase().includes(termino)
    );
  }

  estaInscrito(curso: CursoDTO): boolean {
    return this.cursosInscritosIds.has(curso._id);
  }

  inscribirse(curso: CursoDTO) {
    if (!this.currentUser?.id) {
      this.mensajeError = 'Debes iniciar sesión para inscribirte.';
      return;
    }
    if (this.estaInscrito(curso)) return;

    this.inscribiendoId = curso._id;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.inscripcionService.inscribirse(this.currentUser.id, curso._id).subscribe({
      next: () => {
        this.cursosInscritosIds.add(curso._id);
        this.mensajeExito = `Te inscribiste en "${curso.titulo}". Ya aparece en tu panel.`;
        this.inscribiendoId = null;
      },
      error: (err) => {
        this.mensajeError = err?.error?.error || 'No se pudo completar la inscripción.';
        this.inscribiendoId = null;
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
