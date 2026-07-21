import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CursoDTO {
  _id: string;
  titulo: string;
  docente: string;
  categoria: string;
  horas: number;
  modalidad: string;
  precio: number;
  icono: string;
  color: string;
  descripcion: string;
  estado: string;
}

export interface CrearCursoDTO {
  titulo: string;
  docente: string;
  categoria: string;
  horas: number;
  modalidad: string;
  precio: number;
  icono?: string;
  color?: string;
  descripcion?: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Curso {
  // api-cursos corre en puerto 3001
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  /** Cabeceras con JWT para operaciones protegidas */
  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listarCursos(): Observable<CursoDTO[]> {
    return this.http.get<CursoDTO[]>(`${this.apiUrl}/cursos`);
  }

  listarCursosDocente(nombre: string): Observable<CursoDTO[]> {
    return this.http.get<CursoDTO[]>(`${this.apiUrl}/cursos/docente/${nombre}`);
  }

  crearCurso(datos: CrearCursoDTO): Observable<CursoDTO> {
    return this.http.post<CursoDTO>(`${this.apiUrl}/cursos`, datos, {
      headers: this.authHeaders(),
    });
  }

  actualizarCurso(id: string, datos: Partial<CrearCursoDTO>): Observable<CursoDTO> {
    return this.http.put<CursoDTO>(`${this.apiUrl}/cursos/${id}`, datos, {
      headers: this.authHeaders(),
    });
  }

  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cursos/${id}`, {
      headers: this.authHeaders(),
    });
  }
}
