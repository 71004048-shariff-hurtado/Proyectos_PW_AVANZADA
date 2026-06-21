import { useCursos } from '../hooks/useCursos';
import '../styles/Usuario.css';

export default function Usuario() {
  const { usuarioActual, inscripciones } = useCursos();

  return (
    <div className="usuario-container">
      <div className="usuario-card">
        <div className="usuario-header">
          <div className="usuario-avatar">
            {usuarioActual.nombre.substring(0, 2).toUpperCase()}
          </div>
          <div className="usuario-info-header">
            <h1 className="usuario-nombre">{usuarioActual.nombre}</h1>
            <p className="usuario-rol">👨‍🎓 {usuarioActual.rol}</p>
            <p className="usuario-email">📧 {usuarioActual.email}</p>
          </div>
        </div>

        <div className="usuario-stats">
          <div className="stat-item">
            <span className="stat-valor">{inscripciones.length}</span>
            <span className="stat-label">Cursos Inscritos</span>
          </div>
          <div className="stat-item">
            <span className="stat-valor">
              {inscripciones.reduce((acc, i) => acc + i.progreso, 0) / inscripciones.length || 0}%
            </span>
            <span className="stat-label">Progreso Promedio</span>
          </div>
          <div className="stat-item">
            <span className="stat-valor">
              {inscripciones.filter(i => i.estado === 'Completado').length}
            </span>
            <span className="stat-label">Completados</span>
          </div>
        </div>

        <div className="usuario-acciones">
          <button className="btn-perfil">✏️ Editar Perfil</button>
          <button className="btn-perfil">🔐 Cambiar Contraseña</button>
          <button className="btn-perfil btn-salir">🚪 Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}