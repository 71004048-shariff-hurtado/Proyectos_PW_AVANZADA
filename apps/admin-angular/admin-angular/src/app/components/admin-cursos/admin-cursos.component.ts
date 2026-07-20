import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso as CursoService, CursoDTO, CrearCursoDTO } from '../../services/curso';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-cursos.component.html',
})
export class AdminCursosComponent implements OnInit {
  // ── Estado de la lista ──────────────────────────────
  cursos: CursoDTO[] = [];
  cargando = true;
  errorCarga = '';

  // ── Búsqueda / Filtros ──────────────────────────────
  textoBusqueda = '';
  filtroCategoria = '';
  filtroEstado = '';

  // ── Modal / Formulario ──────────────────────────────
  mostrarModal = false;
  modoEdicion = false;
  cursoEditandoId: string | null = null;
  guardando = false;
  errorFormulario = '';
  exitoMensaje = '';

  cursoForm: FormGroup;

  // ── Menú móvil ──────────────────────────────────────
  isMenuOpen = false;

  constructor(
    private cursoService: CursoService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.cursoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      docente: ['', Validators.required],
      categoria: ['', Validators.required],
      horas: [0, [Validators.required, Validators.min(1)]],
      modalidad: ['Virtual', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: [''],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarCursos();
  }

  // ── Carga de datos ──────────────────────────────────

  cargarCursos() {
    this.cargando = true;
    this.errorCarga = '';

    this.cursoService.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudieron cargar los cursos. Verifica que el servidor (puerto 3001) esté corriendo.';
        this.cargando = false;
      },
    });
  }

  // ── Filtrado ────────────────────────────────────────

  get cursosFiltrados(): CursoDTO[] {
    let lista = [...this.cursos];
    const termino = this.textoBusqueda.trim().toLowerCase();

    if (termino) {
      lista = lista.filter(
        (c) =>
          c.titulo?.toLowerCase().includes(termino) ||
          c.docente?.toLowerCase().includes(termino) ||
          c.categoria?.toLowerCase().includes(termino)
      );
    }

    if (this.filtroCategoria) {
      lista = lista.filter((c) => c.categoria === this.filtroCategoria);
    }

    if (this.filtroEstado) {
      lista = lista.filter((c) => c.estado === this.filtroEstado);
    }

    return lista;
  }

  // ── Modal ───────────────────────────────────────────

  abrirModalNuevo() {
    this.modoEdicion = false;
    this.cursoEditandoId = null;
    this.errorFormulario = '';
    this.exitoMensaje = '';
    this.cursoForm.reset({
      modalidad: 'Virtual',
      estado: 'Activo',
      horas: 0,
      precio: 0,
    });
    this.mostrarModal = true;
  }

  abrirModalEditar(curso: CursoDTO) {
    this.modoEdicion = true;
    this.cursoEditandoId = curso._id;
    this.errorFormulario = '';
    this.exitoMensaje = '';
    this.cursoForm.patchValue({
      titulo: curso.titulo,
      docente: curso.docente,
      categoria: curso.categoria,
      horas: curso.horas,
      modalidad: curso.modalidad,
      precio: curso.precio,
      descripcion: curso.descripcion || '',
      estado: curso.estado,
    });
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cursoForm.reset();
  }

  // ── CRUD ────────────────────────────────────────────

  guardarCurso() {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      this.errorFormulario = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.guardando = true;
    this.errorFormulario = '';

    const datos: CrearCursoDTO = this.cursoForm.value;

    if (this.modoEdicion && this.cursoEditandoId) {
      this.cursoService.actualizarCurso(this.cursoEditandoId, datos).subscribe({
        next: (actualizado) => {
          const idx = this.cursos.findIndex((c) => c._id === this.cursoEditandoId);
          if (idx !== -1) this.cursos[idx] = actualizado;
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
          this.exitoMensaje = `Curso "${actualizado.titulo}" actualizado correctamente.`;
          setTimeout(() => (this.exitoMensaje = ''), 4000);
        },
        error: (err) => {
          this.errorCarga = err?.error?.error || 'Error al actualizar el curso.';
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
        },
      });
    } else {
      this.cursoService.crearCurso(datos).subscribe({
        next: (nuevo) => {
          this.cursos.unshift(nuevo);
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
          this.exitoMensaje = `Curso "${nuevo.titulo}" creado exitosamente.`;
          setTimeout(() => (this.exitoMensaje = ''), 4000);
        },
        error: (err) => {
          this.errorCarga = err?.error?.error || 'Error al crear el curso.';
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
        },
      });
    }
  }

  eliminarCurso(curso: CursoDTO) {
    const confirmado = confirm(`¿Eliminar el curso "${curso.titulo}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    this.cursoService.eliminarCurso(curso._id).subscribe({
      next: () => {
        this.cursos = this.cursos.filter((c) => c._id !== curso._id);
        this.exitoMensaje = `Curso "${curso.titulo}" eliminado.`;
        setTimeout(() => (this.exitoMensaje = ''), 4000);
      },
      error: () => {
        this.errorCarga = 'No se pudo eliminar el curso. Intenta de nuevo.';
      },
    });
  }

  // ── Helpers ─────────────────────────────────────────

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }

  // Helpers para validación en la plantilla
  campoInvalido(campo: string): boolean {
    const control = this.cursoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
