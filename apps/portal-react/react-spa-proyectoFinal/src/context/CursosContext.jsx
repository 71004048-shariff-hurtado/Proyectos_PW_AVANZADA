import { createContext, useState, useCallback } from 'react';
import { cursosMock, inscripcionesMock } from '../data/cursos';

// Crear el contexto
export const CursosContext = createContext();

// Proveedor del contexto
export function CursosProvider({ children }) {
  const [cursos, setCursos] = useState(cursosMock);
  const [inscripciones, setInscripciones] = useState(inscripcionesMock);
  const [usuarioActual, setUsuarioActual] = useState({
    id: 1,
    nombre: "Carlos García",
    email: "carlos@example.com",
    rol: "Estudiante"
  });

  // Obtener un curso por ID
  const obtenerCurso = useCallback((id) => {
    return cursos.find(curso => curso.id === id);
  }, [cursos]);

  // Obtener todos los cursos
  const obtenerTodosCursos = useCallback(() => {
    return cursos;
  }, [cursos]);

  // Obtener inscripciones del estudiante
  const obtenerInscripciones = useCallback(() => {
    return inscripciones;
  }, [inscripciones]);

  // Verificar si el estudiante está inscrito en un curso
  const estaInscrito = useCallback((cursoId) => {
    return inscripciones.some(inscripcion => inscripcion.cursoId === cursoId);
  }, [inscripciones]);

  // Agregar nueva inscripción
  const agregarInscripcion = useCallback((cursoId) => {
    const curso = obtenerCurso(cursoId);
    if (curso && !estaInscrito(cursoId)) {
      const nuevaInscripcion = {
        id: Math.max(...inscripciones.map(i => i.id), 0) + 1,
        cursoId: curso.id,
        nombreCurso: curso.nombre,
        docente: curso.docente,
        fechaInscripcion: new Date().toISOString().split('T')[0],
        modalidad: curso.modalidad,
        progreso: 0,
        estado: "En progreso"
      };
      setInscripciones([...inscripciones, nuevaInscripcion]);
      return true;
    }
    return false;
  }, [inscripciones, obtenerCurso, estaInscrito]);

  // Eliminar inscripción
  const eliminarInscripcion = useCallback((inscripcionId) => {
    setInscripciones(inscripciones.filter(i => i.id !== inscripcionId));
    return true;
  }, [inscripciones]);

  // Filtrar cursos por categoría
  const filtrarPorCategoria = useCallback((categoria) => {
    if (categoria === "Todos") return cursos;
    return cursos.filter(curso => curso.categoria === categoria);
  }, [cursos]);

  // Filtrar cursos por modalidad
  const filtrarPorModalidad = useCallback((modalidad) => {
    if (modalidad === "Todas") return cursos;
    return cursos.filter(curso => curso.modalidad === modalidad);
  }, [cursos]);

  // Buscar cursos por texto
  const buscarCursos = useCallback((termino) => {
    const termino_lower = termino.toLowerCase();
    return cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(termino_lower) ||
      curso.docente.toLowerCase().includes(termino_lower) ||
      curso.descripcion.toLowerCase().includes(termino_lower)
    );
  }, [cursos]);

  const valor = {
    cursos,
    inscripciones,
    usuarioActual,
    obtenerCurso,
    obtenerTodosCursos,
    obtenerInscripciones,
    estaInscrito,
    agregarInscripcion,
    eliminarInscripcion,
    filtrarPorCategoria,
    filtrarPorModalidad,
    buscarCursos
  };

  return (
    <CursosContext.Provider value={valor}>
      {children}
    </CursosContext.Provider>
  );
}
