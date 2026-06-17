import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CursosModel {
  _id: string;
  curso: string;
  docente: string;
  categorias: string;
  insctritos: string;
  precio: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private http = inject(HttpClient);
  
  getCurso(): Observable<CursosModel[]> {
    return this.http.get<CursosModel[]>('http://localhost:3000/api/cursos');
  }

  crearCurso(curso: CursosModel): Observable<CursosModel> {
        return this.http.post<CursosModel>('http://localhost:3000/api/cursos', curso);
  }

    actualizarCurso(id: string, curso: Partial<CursosModel>): Observable<CursosModel> {
        return this.http.put<CursosModel>(`http://localhost:3000/api/cursos/${id}`, curso);
  }

    eliminarCurso(id: string): Observable<{ mensaje: string }> {
        return this.http.delete<{ mensaje: string }>(`http://localhost:3000/api/cursos/${id}`);
  }
}