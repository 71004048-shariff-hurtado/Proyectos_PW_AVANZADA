import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoDTO } from './curso';

export interface InscripcionDTO {
  _id: string;
  estudianteId: string;
  cursoId: CursoDTO;
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

  inscribirse(estudianteId: string, cursoId: string): Observable<InscripcionDTO> {
    return this.http.post<InscripcionDTO>(`${this.apiUrl}/inscripciones`, { estudianteId, cursoId });
  }

  misInscripciones(estudianteId: string): Observable<InscripcionDTO[]> {
    return this.http.get<InscripcionDTO[]>(`${this.apiUrl}/inscripciones/estudiante/${estudianteId}`);
  }

  cancelar(inscripcionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inscripciones/${inscripcionId}`);
  }
}
