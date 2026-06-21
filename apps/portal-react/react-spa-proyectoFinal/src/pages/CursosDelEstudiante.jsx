import { useState } from 'react';
import { Link } from 'react-router-dom';
import TarjetaCurso from '../components/TarjetaCurso';
import { useCursos } from '../hooks/useCursos';
import '../styles/CursosDelEstudiante.css';

export default function CursosDelEstudiante() {
  const { obtenerInscripciones, usuarioActual } = useCursos();
  const inscripciones = obtenerInscripciones();
  
  const [tabActiva, setTabActiva] = useState('todos');

  // Filtrar inscripciones por estado
  const inscripcionesFiltradas = inscripciones.filter(inscripcion => {
    if (tabActiva === 'todos') return true;
    if (tabActiva === 'progreso') return inscripcion.estado === 'En progreso';
    if (tabActiva === 'completados') return inscripcion.estado === 'Completado';
    return true;
  });

  const inscripcionesEnProgreso = inscripciones.filter(i => i.estado === 'En progreso').length;
  const inscripcionesCompletadas = inscripciones.filter(i => i.estado === 'Completado').length;

  return (
    <div className="inscripciones-container">
      {/* Header */}
      <header className="inscripciones-header">
        <div className="header-content">
          <div className="header-titulo">
            <h1>Mis Inscripciones</h1>
            <p>Gestiona y da seguimiento a todos tus cursos inscritos.</p>
          </div>
          <Link to="/catalogocursos" className="btn btn-primary">
            + Nuevo curso
          </Link>
        </div>
      </header>

      <main className="inscripciones-main">
        <div className="inscripciones-wrapper">
          
          {/* Estadísticas */}
          <div className="estadisticas-grid">
            <div className="estadistica-card">
              <div className="estadistica-icon">📚</div>
              <div className="estadistica-info">
                <span className="estadistica-numero">{inscripciones.length}</span>
                <span className="estadistica-label">Total inscrito</span>
              </div>
            </div>
            <div className="estadistica-card">
              <div className="estadistica-icon">⏳</div>
              <div className="estadistica-info">
                <span className="estadistica-numero">{inscripcionesEnProgreso}</span>
                <span className="estadistica-label">En progreso</span>
              </div>
            </div>
            <div className="estadistica-card">
              <div className="estadistica-icon">✅</div>
              <div className="estadistica-info">
                <span className="estadistica-numero">{inscripcionesCompletadas}</span>
                <span className="estadistica-label">Completados</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={`tab ${tabActiva === 'todos' ? 'activo' : ''}`}
                onClick={() => setTabActiva('todos')}
              >
                Todos ({inscripciones.length})
              </button>
              <button 
                className={`tab ${tabActiva === 'progreso' ? 'activo' : ''}`}
                onClick={() => setTabActiva('progreso')}
              >
                En progreso ({inscripcionesEnProgreso})
              </button>
              <button 
                className={`tab ${tabActiva === 'completados' ? 'activo' : ''}`}
                onClick={() => setTabActiva('completados')}
              >
                Completados ({inscripcionesCompletadas})
              </button>
            </div>
          </div>

          {/* Lista de inscripciones */}
          <div className="inscripciones-lista">
            {inscripcionesFiltradas.length > 0 ? (
              inscripcionesFiltradas.map(inscripcion => (
                <TarjetaCurso 
                  key={inscripcion.id} 
                  cursoId={inscripcion.cursoId} 
                  variante="inscripcion"
                />
              ))
            ) : (
              <div className="inscripciones-vacia">
                <div className="vacia-icon">📭</div>
                <h3>No hay inscripciones en esta categoría</h3>
                <p>Explora nuestro catálogo y encuentra cursos interesantes.</p>
                <Link to="/catalogocursos" className="btn btn-primary">
                  Explorar Cursos
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}