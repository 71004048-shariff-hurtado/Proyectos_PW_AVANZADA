import { useContext } from 'react';
import { CursosContext } from '../context/CursosContext';

// Hook personalizado para acceder al contexto de cursos
export function useCursos() {
  const contexto = useContext(CursosContext);
  
  if (!contexto) {
    throw new Error('useCursos debe ser usado dentro de CursosProvider');
  }
  
  return contexto;
}
