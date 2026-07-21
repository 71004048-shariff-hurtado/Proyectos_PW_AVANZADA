import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password: contrasenia });
  }

  register(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, studentData);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // --- Sincronización de Docentes ---
  syncDocenteAccount(docenteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/docente`, docenteData, { headers: this.getAuthHeaders() });
  }

  updateDocenteAccount(correoOriginal: string, docenteData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/docente/${encodeURIComponent(correoOriginal)}`, docenteData, { headers: this.getAuthHeaders() });
  }

  deleteDocenteAccount(correo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/docente/${encodeURIComponent(correo)}`, { headers: this.getAuthHeaders() });
  }
  // ----------------------------------

  saveSession(token: string, role: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
