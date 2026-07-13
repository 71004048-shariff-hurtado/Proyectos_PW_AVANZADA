import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminEstudiantesComponent } from './components/admin-estudiantes/admin-estudiantes.component';
import { AdminDocentesComponent } from './components/admin-docentes/admin-docentes.component';
import { AdminCursosComponent } from './components/admin-cursos/admin-cursos.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { DashboardEstudiante } from './components/dashboard-estudiante/dashboard-estudiante';
import { MisInscripciones } from './components/mis-inscripciones/mis-inscripciones';
import { Perfil } from './components/perfil/perfil';
import { authGuardGuard } from './guard/auth-guard-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'dashboard-estudiante', component: DashboardEstudiante, canActivate: [authGuardGuard] },
  { path: 'mis-inscripciones', component: MisInscripciones, canActivate: [authGuardGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuardGuard] },
  { path: 'admin-estudiantes', component: AdminEstudiantesComponent, canActivate: [authGuardGuard] },
  { path: 'admin-docentes', component: AdminDocentesComponent, canActivate: [authGuardGuard] },
  { path: 'admin-cursos', component: AdminCursosComponent, canActivate: [authGuardGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuardGuard] },
  { path: '**', redirectTo: '' }
];
