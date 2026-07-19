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
    // Estudiante intentando acceder a ruta de admin → lo manda al panel del estudiante
    return router.navigate(['/dashboard-estudiante']);
  }

  // Rutas de estudiante: no deben ser accesibles para admin (opcional)
  const estudianteRoutes = ['/dashboard-estudiante', '/mis-inscripciones', '/perfil', '/explorar-cursos'];
  const esRutaEstudiante = estudianteRoutes.some((r) => url.startsWith(r));

  if (esRutaEstudiante && role === 'admin') {
    // Admin intentando acceder a panel de estudiante → lo manda al dashboard admin
    return router.navigate(['/admin-dashboard']);
  }

  return true;
};
