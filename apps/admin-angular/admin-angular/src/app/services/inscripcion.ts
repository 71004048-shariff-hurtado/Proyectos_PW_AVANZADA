import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

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
    });
  }

  misInscripciones(estudianteId: string): Observable<InscripcionDTO[]> {
    return this.http.get<InscripcionDTO[]>(`${this.apiUrl}/inscripciones/estudiante/${estudianteId}`);
  }

  cancelar(inscripcionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inscripciones/${inscripcionId}`);
  }
}
