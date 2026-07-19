import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  listarCursos(): Observable<CursoDTO[]> {
    return this.http.get<CursoDTO[]>(`${this.apiUrl}/cursos`);
  }

  crearCurso(datos: CrearCursoDTO): Observable<CursoDTO> {
    return this.http.post<CursoDTO>(`${this.apiUrl}/cursos`, datos);
  }

  actualizarCurso(id: string, datos: Partial<CrearCursoDTO>): Observable<CursoDTO> {
    return this.http.put<CursoDTO>(`${this.apiUrl}/cursos/${id}`, datos);
  }

  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cursos/${id}`);
  }
}
