import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DocenteModel {
  _id: string;
  nombre: string;
  email: string;
  especialidad: string;
  departamento: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  private http = inject(HttpClient);
  
  getDocente(): Observable<DocenteModel[]> {
    return this.http.get<DocenteModel[]>('http://localhost:3000/api/docentes');
  }

  crearDocente(docente: DocenteModel): Observable<DocenteModel> {
        return this.http.post<DocenteModel>('http://localhost:3000/api/docentes', docente);
  }

    actualizarDocente(id: string, docente: Partial<DocenteModel>): Observable<DocenteModel> {
        return this.http.put<DocenteModel>(`http://localhost:3000/api/docentes/${id}`, docente);
  }

    eliminarDocente(id: string): Observable<{ mensaje: string }> {
        return this.http.delete<{ mensaje: string }>(`http://localhost:3000/api/docentes/${id}`);
  }
}
