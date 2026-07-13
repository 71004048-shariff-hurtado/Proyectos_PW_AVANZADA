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

@Injectable({
  providedIn: 'root'
})
export class Curso {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  listarCursos(): Observable<CursoDTO[]> {
    return this.http.get<CursoDTO[]>(`${this.apiUrl}/cursos`);
  }
}
