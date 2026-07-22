import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CURSOS_URL } from '../config/api.config';

export interface DocenteDTO {
  _id: string;
  nombre: string;
  apellidos: string;
  email: string;
  especialidad: string;
  departamento: string;
  estado: string;
}

export interface CrearDocenteDTO {
  nombre: string;
  apellidos: string;
  email: string;
  especialidad: string;
  departamento: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  private apiUrl = API_CURSOS_URL;

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listarDocentes(): Observable<DocenteDTO[]> {
    return this.http.get<DocenteDTO[]>(`${this.apiUrl}/docentes`);
  }

  crearDocente(datos: CrearDocenteDTO): Observable<DocenteDTO> {
    return this.http.post<DocenteDTO>(`${this.apiUrl}/docentes`, datos, {
      headers: this.authHeaders(),
    });
  }

  actualizarDocente(id: string, datos: Partial<CrearDocenteDTO>): Observable<DocenteDTO> {
    return this.http.put<DocenteDTO>(`${this.apiUrl}/docentes/${id}`, datos, {
      headers: this.authHeaders(),
    });
  }

  eliminarDocente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/docentes/${id}`, {
      headers: this.authHeaders(),
    });
  }
}
