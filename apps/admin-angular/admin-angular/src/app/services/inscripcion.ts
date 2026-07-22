import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_AUTH_URL } from '../config/api.config';

export interface InscripcionDTO {
  _id: string;
  estudianteId: string;
  cursoId: string;          // ID del curso (string, no objeto populado)
  nombreCurso: string;      // Nombre desnormalizado para mostrar sin join
  docente: string;
  progreso: number;
  estado: 'progreso' | 'completado';
  fechaInscripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = API_AUTH_URL;

  constructor(private http: HttpClient) {}

  /** Cabeceras con JWT para operaciones protegidas */
  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * Inscribir al estudiante en un curso.
   * Requiere el nombre del curso para guardarlo desnormalizado.
   */
  inscribirse(
    estudianteId: string,
    cursoId: string,
    nombreCurso: string,
    docente: string = ''
  ): Observable<InscripcionDTO> {
    return this.http.post<InscripcionDTO>(`${this.apiUrl}/inscripciones`, {
      estudianteId,
      cursoId,
      nombreCurso,
      docente,
    }, { headers: this.authHeaders() });
  }

  misInscripciones(estudianteId: string): Observable<InscripcionDTO[]> {
    return this.http.get<InscripcionDTO[]>(`${this.apiUrl}/inscripciones/estudiante/${estudianteId}`, {
      headers: this.authHeaders()
    });
  }

  inscripcionesPorDocente(nombreDocente: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inscripciones/docente/${nombreDocente}`, {
      headers: this.authHeaders()
    });
  }

  cancelar(inscripcionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inscripciones/${inscripcionId}`, {
      headers: this.authHeaders()
    });
  }
}
