import { useContext } from 'react';
import { CursosContext } from '../context/CursosContext';

/**
 * Hook personalizado para acceder al contexto de cursos.
 * Lanza error si se usa fuera del CursosProvider.
 */
export function useCursos() {
  const ctx = useContext(CursosContext);
  if (!ctx) throw new Error('useCursos debe usarse dentro de CursosProvider');
  return ctx;
}
