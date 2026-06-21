import { useCursos } from '../hooks/useCursos';
import { formatearPrecio, calcularCalificacionPromedio } from '../utils/formatters';
import '../styles/TarjetaCurso.css';

export default function TarjetaCurso({ cursoId, variante = 'catalogo' }) {
  const { obtenerCurso, estaInscrito, agregarInscripcion, eliminarInscripcion, inscripciones } = useCursos();
  const curso = obtenerCurso(cursoId);

  if (!curso) {
    return <div className="tarjeta-error">Curso no encontrado</div>;
  }

  const inscripto = estaInscrito(cursoId);
  const inscripcionActual = inscripciones.find(i => i.cursoId === cursoId);

  const handleInscribirse = (e) => {
    e.preventDefault();
    agregarInscripcion(cursoId);
  };

  const handleDesinscribirse = (e) => {
    e.preventDefault();
    if (inscripcionActual) {
      eliminarInscripcion(inscripcionActual.id);
    }
  };
}
