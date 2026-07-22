import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { API_AUTH_URL } from '../../config/api.config';

interface EstudianteDTO {
  _id: string;
  nombre: string;
  apellidos: string;
  correo_electronico: string;
  programa_academico?: string;
}

@Component({
  selector: 'app-admin-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-estudiantes.component.html',
})
export class AdminEstudiantesComponent implements OnInit {
  isMenuOpen = false;
  textoBusqueda = '';

  estudiantes: EstudianteDTO[] = [];
  cargando = true;
  errorCarga = '';
  exitoMensaje = '';

  private apiUrl = API_AUTH_URL;

  // Modal / Formulario
  mostrarModal = false;
  modoEdicion = false;
  estudianteEditandoId: string | null = null;
  guardando = false;
  errorFormulario = '';
  estudianteForm: FormGroup;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      programa_academico: ['']
    });
  }

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.cargando = true;
    this.errorCarga = '';
    this.http.get<EstudianteDTO[]>(`${this.apiUrl}/usuarios`).subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudieron cargar los estudiantes. Verifica que el servidor esté corriendo.';
        this.cargando = false;
      },
    });
  }

  get estudiantesFiltrados(): EstudianteDTO[] {
    const termino = this.textoBusqueda.trim().toLowerCase();
    if (!termino) return this.estudiantes;
    return this.estudiantes.filter(
      (e) =>
        e.nombre?.toLowerCase().includes(termino) ||
        e.apellidos?.toLowerCase().includes(termino) ||
        e.correo_electronico?.toLowerCase().includes(termino) ||
        e.programa_academico?.toLowerCase().includes(termino)
    );
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.estudianteEditandoId = null;
    this.estudianteForm.reset();
    this.errorFormulario = '';
    this.mostrarModal = true;
  }

  abrirModalEditar(estudiante: EstudianteDTO) {
    this.modoEdicion = true;
    this.estudianteEditandoId = estudiante._id;
    this.errorFormulario = '';
    this.estudianteForm.patchValue({
      nombre: estudiante.nombre,
      apellidos: estudiante.apellidos,
      correo_electronico: estudiante.correo_electronico,
      programa_academico: estudiante.programa_academico
    });
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.errorFormulario = '';
  }

  campoInvalido(campo: string): boolean {
    const control = this.estudianteForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  guardarEstudiante() {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched();
      this.errorFormulario = 'Por favor completa todos los campos obligatorios y asegúrate de que el correo es válido.';
      return;
    }

    this.guardando = true;
    this.errorFormulario = '';
    const datos = this.estudianteForm.value;

    if (this.modoEdicion && this.estudianteEditandoId) {
      this.http.put<EstudianteDTO>(`${this.apiUrl}/usuarios/${this.estudianteEditandoId}`, datos, this.authHeaders()).subscribe({
        next: (actualizado) => {
          const idx = this.estudiantes.findIndex((e) => e._id === this.estudianteEditandoId);
          if (idx !== -1) this.estudiantes[idx] = actualizado;
          this.exitoMensaje = `Estudiante "${actualizado.nombre} ${actualizado.apellidos}" actualizado.`;
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
          setTimeout(() => (this.exitoMensaje = ''), 4000);
        },
        error: (err) => {
          this.errorCarga = err?.error?.error || 'Error al actualizar estudiante.';
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
        },
      });
    } else {
      this.http.post<EstudianteDTO>(`${this.apiUrl}/usuarios`, datos, this.authHeaders()).subscribe({
        next: (nuevo) => {
          this.estudiantes.unshift(nuevo);
          this.exitoMensaje = `Estudiante "${nuevo.nombre} ${nuevo.apellidos}" creado exitosamente (Pass: Estudiante123!).`;
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
          setTimeout(() => (this.exitoMensaje = ''), 4000);
        },
        error: (err) => {
          this.errorCarga = err?.error?.error || 'Error al crear estudiante.';
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
        },
      });
    }
  }

  eliminarEstudiante(estudiante: EstudianteDTO) {
    const confirmado = confirm(
      `¿Eliminar al estudiante "${estudiante.nombre} ${estudiante.apellidos}"? Esta acción no se puede deshacer.`
    );
    if (!confirmado) return;

    this.http.delete(`${this.apiUrl}/usuarios/${estudiante._id}`, this.authHeaders()).subscribe({
      next: () => {
        this.estudiantes = this.estudiantes.filter((e) => e._id !== estudiante._id);
        this.exitoMensaje = `Estudiante "${estudiante.nombre} ${estudiante.apellidos}" eliminado.`;
        this.cdr.detectChanges();
        setTimeout(() => (this.exitoMensaje = ''), 4000);
      },
      error: () => {
        this.errorCarga = 'No se pudo eliminar el estudiante. Intenta de nuevo.';
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
