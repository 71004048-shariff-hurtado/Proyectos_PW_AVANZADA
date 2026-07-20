import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard de autenticación con verificación de rol.
 * - Rutas de admin: solo accesibles con role === 'admin'
 * - Rutas de estudiante: accesibles con cualquier token válido
 * - Sin token: redirige al home (/)
 */
export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Sin token → redirigir al login
  if (!token) {
    return router.navigate(['/']);
  }

  const url = state.url;

  // Rutas de administración: solo para admins
  const adminRoutes = ['/admin-dashboard', '/admin-cursos', '/admin-estudiantes', '/admin-docentes'];
  const esRutaAdmin = adminRoutes.some((r) => url.startsWith(r));

  if (esRutaAdmin && role !== 'admin') {
    // Redirigir según rol
    return router.navigate([role === 'docente' ? '/dashboard-docente' : '/dashboard-estudiante']);
  }

  // Rutas de estudiante
  const estudianteRoutes = ['/dashboard-estudiante', '/mis-inscripciones', '/perfil', '/explorar-cursos'];
  const esRutaEstudiante = estudianteRoutes.some((r) => url.startsWith(r));

  if (esRutaEstudiante && role !== 'estudiante') {
    return router.navigate([role === 'admin' ? '/admin-dashboard' : '/dashboard-docente']);
  }

  // Rutas de docente
  const docenteRoutes = ['/dashboard-docente', '/mis-cursos-docente', '/mis-alumnos'];
  const esRutaDocente = docenteRoutes.some((r) => url.startsWith(r));

  if (esRutaDocente && role !== 'docente') {
    return router.navigate([role === 'admin' ? '/admin-dashboard' : '/dashboard-estudiante']);
  }

  return true;
};
