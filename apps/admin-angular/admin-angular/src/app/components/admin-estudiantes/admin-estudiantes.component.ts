import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-estudiantes.component.html',
})
export class AdminEstudiantesComponent implements OnInit {
  isMenuOpen = false;
  textoBusqueda = '';

  estudiantes: EstudianteDTO[] = [];
  cargando = true;
  errorCarga = '';
  exitoMensaje = '';

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  eliminarEstudiante(estudiante: EstudianteDTO) {
    const confirmado = confirm(
      `¿Eliminar al estudiante "${estudiante.nombre} ${estudiante.apellidos}"? Esta acción no se puede deshacer.`
    );
    if (!confirmado) return;

    this.http.delete(`${this.apiUrl}/usuarios/${estudiante._id}`).subscribe({
      next: () => {
        this.estudiantes = this.estudiantes.filter((e) => e._id !== estudiante._id);
        this.exitoMensaje = `Estudiante "${estudiante.nombre} ${estudiante.apellidos}" eliminado.`;
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
