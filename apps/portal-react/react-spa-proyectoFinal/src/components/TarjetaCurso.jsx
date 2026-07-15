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

  if (variante === 'inscripcion' && inscripcionActual) {
    return (
      <div className="tarjeta-curso inscripcion">
        <div className="inscripcion-header">
          <div className="inscripcion-info">
            <h3 className="inscripcion-nombre">{curso.nombre}</h3>
            <p className="inscripcion-docente">Docente: {curso.docente}</p>
          </div>
          <span className={`badge-estado ${inscripcionActual.estado === 'En progreso' ? 'en progreso' : 'completado'}`}>
            {inscripcionActual.estado}
          </span>
        </div>
        
        <div className="progreso-texto">Progreso: {inscripcionActual.progreso}%</div>
        <div className="progreso-barra">
          <div className="progreso-fill" style={{ width: `${inscripcionActual.progreso}%` }}></div>
        </div>
        
        <div className="inscripcion-meta">
          <span>Modalidad: {curso.modalidad}</span>
          <span>Inscrito: {inscripcionActual.fechaInscripcion}</span>
        </div>
        
        <div className="inscripcion-acciones">
          <button className="btn btn-outline">Continuar Aprendiendo</button>
          <button className="btn btn-outline" onClick={handleDesinscribirse}>Cancelar Inscripción</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`tarjeta-curso ${variante}`}>
      <div className="tarjeta-header">
        <div className="curso-imagen">{curso.imagen || '📚'}</div>
        <span className="badge-categoria">{curso.categoria}</span>
      </div>
      
      <div className="tarjeta-body">
        <h3 className="curso-nombre">{curso.nombre}</h3>
        <p className="curso-docente">👨‍🏫 {curso.docente}</p>
        <p className="curso-descripcion">{curso.descripcion}</p>
        
        <div className="curso-meta">
          <span className="meta-item">⏱️ {curso.duracion}</span>
          <span className="meta-item">🏷️ {curso.modalidad}</span>
          <span className="meta-item">{curso.calificacion ? calcularCalificacionPromedio(curso.calificacion) : '4.5 ⭐'}</span>
        </div>
        
        <div className="curso-footer">
          <span className="curso-precio">{formatearPrecio ? formatearPrecio(curso.precio) : `$${curso.precio}`}</span>
        </div>
      </div>
      
      <div className="tarjeta-acciones">
        {inscripto ? (
          <button className="btn btn-success" disabled>Ya estás inscrito</button>
        ) : (
          <button className="btn btn-primary" onClick={handleInscribirse}>
            Inscribirse ahora
          </button>
        )}
      </div>
    </div>
  );
}

