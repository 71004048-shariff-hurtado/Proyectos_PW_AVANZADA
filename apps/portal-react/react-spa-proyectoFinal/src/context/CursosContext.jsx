import { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from './AuthContext';

// Crear el contexto
export const CursosContext = createContext();

// Proveedor del contexto
export function CursosProvider({ children }) {
  const { usuario, isAuthenticated } = useAuth();

  const [cursos, setCursos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [cargandoCursos, setCargandoCursos] = useState(true);
  const [cargandoInscripciones, setCargandoInscripciones] = useState(false);
  const [errorCursos, setErrorCursos] = useState('');

  // Cargar cursos desde la API al montar
  useEffect(() => {
    setCargandoCursos(true);
    api.getCursos()
      .then((data) => {
        setCursos(data);
        setCargandoCursos(false);
      })
      .catch(() => {
        setErrorCursos('No se pudieron cargar los cursos. Verifica que el servidor esté activo.');
        setCargandoCursos(false);
      });
  }, []);

  // Cargar inscripciones cuando el usuario esté autenticado
  useEffect(() => {
    if (!isAuthenticated || !usuario?.id) {
      setInscripciones([]);
      return;
    }
    setCargandoInscripciones(true);
    api.misInscripciones(usuario.id)
      .then((data) => {
        setInscripciones(data);
        setCargandoInscripciones(false);
      })
      .catch(() => {
        setCargandoInscripciones(false);
      });
  }, [isAuthenticated, usuario]);

  // Obtener un curso por ID
  const obtenerCurso = useCallback((id) => {
    return cursos.find((curso) => curso._id === id || curso.id === id);
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
    return inscripciones.some(
      (i) => i.cursoId === cursoId || i.cursoId?._id === cursoId
    );
  }, [inscripciones]);

  // Agregar nueva inscripción (llamada a la API)
  const agregarInscripcion = useCallback(async (cursoId) => {
    if (!usuario?.id) throw new Error('Debes iniciar sesión para inscribirte.');
    if (estaInscrito(cursoId)) throw new Error('Ya estás inscrito en este curso.');

    const curso = obtenerCurso(cursoId);
    const nuevaInscripcion = await api.inscribirse(
      usuario.id,
      cursoId,
      curso?.titulo || curso?.nombre || 'Curso',
      curso?.docente || ''
    );

    setInscripciones((prev) => [...prev, nuevaInscripcion]);
    return nuevaInscripcion;
  }, [inscripciones, usuario, estaInscrito, obtenerCurso]);

  // Eliminar inscripción (llamada a la API)
  const eliminarInscripcion = useCallback(async (inscripcionId) => {
    await api.cancelarInscripcion(inscripcionId);
    setInscripciones((prev) => prev.filter((i) => i._id !== inscripcionId));
  }, []);

  // Filtrar cursos por categoría
  const filtrarPorCategoria = useCallback((categoria) => {
    if (categoria === 'Todos') return cursos;
    return cursos.filter((curso) => curso.categoria === categoria || curso.categorias === categoria);
  }, [cursos]);

  // Filtrar cursos por modalidad
  const filtrarPorModalidad = useCallback((modalidad) => {
    if (modalidad === 'Todas') return cursos;
    return cursos.filter((curso) => curso.modalidad === modalidad);
  }, [cursos]);

  // Buscar cursos por texto
  const buscarCursos = useCallback((termino) => {
    const termino_lower = termino.toLowerCase();
    return cursos.filter(
      (curso) =>
        (curso.titulo || curso.nombre || '').toLowerCase().includes(termino_lower) ||
        (curso.docente || '').toLowerCase().includes(termino_lower) ||
        (curso.descripcion || '').toLowerCase().includes(termino_lower) ||
        (curso.categoria || curso.categorias || '').toLowerCase().includes(termino_lower)
    );
  }, [cursos]);

  const valor = {
    cursos,
    inscripciones,
    cargandoCursos,
    cargandoInscripciones,
    errorCursos,
    obtenerCurso,
    obtenerTodosCursos,
    obtenerInscripciones,
    estaInscrito,
    agregarInscripcion,
    eliminarInscripcion,
    filtrarPorCategoria,
    filtrarPorModalidad,
    buscarCursos,
  };

  return (
    <CursosContext.Provider value={valor}>
      {children}
    </CursosContext.Provider>
  );
}
