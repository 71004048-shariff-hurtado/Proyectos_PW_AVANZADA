import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminEstudiantesComponent } from './components/admin-estudiantes/admin-estudiantes.component';
import { AdminDocentesComponent } from './components/admin-docentes/admin-docentes.component';
import { AdminCursosComponent } from './components/admin-cursos/admin-cursos.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-estudiantes', component: AdminEstudiantesComponent },
  { path: 'admin-docentes', component: AdminDocentesComponent },
  { path: 'admin-cursos', component: AdminCursosComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];
