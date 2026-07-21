import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocenteService, DocenteDTO, CrearDocenteDTO } from '../../services/docente';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-docentes',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-docentes.component.html',
})
export class AdminDocentesComponent implements OnInit {
  docentes: DocenteDTO[] = [];
  cargando = true;
  errorCarga = '';

  mostrarModal = false;
  modoEdicion = false;
  docenteEditandoId: string | null = null;
  guardando = false;
  errorFormulario = '';
  exitoMensaje = '';

  docenteForm: FormGroup;
  isMenuOpen = false;

  constructor(
    private docenteService: DocenteService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.docenteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
      departamento: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarDocentes();
  }

  cargarDocentes() {
    this.cargando = true;
    this.errorCarga = '';
    this.docenteService.listarDocentes().subscribe({
      next: (data) => {
        this.docentes = data;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudieron cargar los docentes. Verifica el backend.';
        this.cargando = false;
      },
    });
  }

  abrirModalNuevo() {
    this.modoEdicion = false;
    this.docenteEditandoId = null;
    this.errorFormulario = '';
    this.exitoMensaje = '';
    this.docenteForm.reset({ estado: 'Activo' });
    this.mostrarModal = true;
  }

  abrirModalEditar(docente: DocenteDTO) {
    this.modoEdicion = true;
    this.docenteEditandoId = docente._id;
    this.errorFormulario = '';
    this.exitoMensaje = '';
    this.docenteForm.patchValue(docente);
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.docenteForm.reset();
  }

  guardarDocente() {
    if (this.docenteForm.invalid) {
      this.docenteForm.markAllAsTouched();
      this.errorFormulario = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.guardando = true;
    this.errorFormulario = '';
    const datos: CrearDocenteDTO = this.docenteForm.value;
    
    // Preparar payload para la base de datos de autenticación (puerto 3000)
    const authPayload = {
      nombre: datos.nombre,
      correo_electronico: datos.email,
      especialidad: datos.especialidad
    };

    if (this.modoEdicion && this.docenteEditandoId) {
      const docenteActual = this.docentes.find(d => d._id === this.docenteEditandoId);
      const correoOriginal = docenteActual ? docenteActual.email : datos.email;
      
      this.authService.updateDocenteAccount(correoOriginal, authPayload).pipe(
        switchMap(() => this.docenteService.actualizarDocente(this.docenteEditandoId!, datos))
      ).subscribe({
        next: (actualizado) => {
          this.exitoMensaje = `Docente "${actualizado.nombre}" actualizado correctamente (Ambas BD).`;
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
          this.cargarDocentes(); // Actualización en tiempo real
          setTimeout(() => (this.exitoMensaje = ''), 4000);
        },
        error: (err) => {
          this.errorCarga = err?.error?.error || 'Error al actualizar.';
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
        },
      });
    } else {
      this.authService.syncDocenteAccount(authPayload).pipe(
        switchMap(() => this.docenteService.crearDocente(datos))
      ).subscribe({
        next: (nuevo) => {
          this.exitoMensaje = `Docente "${nuevo.nombre}" creado exitosamente (Pass: Docente123!).`;
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
          this.cargarDocentes(); // Actualización en tiempo real
          setTimeout(() => (this.exitoMensaje = ''), 4000);
        },
        error: (err) => {
          this.errorCarga = err?.error?.error || 'Error al crear. ¿Correo duplicado?';
          this.guardando = false;
          this.cerrarModal();
          this.cdr.detectChanges();
        },
      });
    }
  }

  eliminarDocente(docente: DocenteDTO) {
    if (!confirm(`¿Eliminar al docente "${docente.nombre}"?`)) return;

    this.authService.deleteDocenteAccount(docente.email).pipe(
      switchMap(() => this.docenteService.eliminarDocente(docente._id))
    ).subscribe({
      next: () => {
        this.docentes = this.docentes.filter((d) => d._id !== docente._id);
        this.exitoMensaje = 'Docente eliminado (Ambas BD).';
        this.cdr.detectChanges();
        setTimeout(() => (this.exitoMensaje = ''), 4000);
      },
      error: () => {
        // Fallback en caso de que la cuenta auth no existiera, pero queramos borrar el perfil de todas formas
        this.docenteService.eliminarDocente(docente._id).subscribe({
           next: () => {
              this.docentes = this.docentes.filter((d) => d._id !== docente._id);
              this.exitoMensaje = 'Docente eliminado (Solo perfil).';
              this.cdr.detectChanges();
              setTimeout(() => (this.exitoMensaje = ''), 4000);
           },
           error: () => this.errorCarga = 'Error al eliminar el docente.'
        });
      },
    });
  }

  get iniciales() {
    return (nombre: string) => nombre.substring(0, 2).toUpperCase();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  campoInvalido(campo: string): boolean {
    const control = this.docenteForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
