import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const ubicacion = useLocation();
  const { usuario, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const esActivo = (ruta) => {
    return ubicacion.pathname === ruta ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // No mostrar navbar en páginas de login/registro
  const rutasSinNavbar = ['/login', '/registro'];
  if (rutasSinNavbar.includes(ubicacion.pathname)) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Marca */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">Edu<em>Tech</em></span>
          </Link>
        </div>

        {/* Menú de navegación */}
        <div className={`navbar-menu ${menuAbierto ? 'abierto' : ''}`}>
          <div className="navbar-nav">
            <Link
              to="/"
              className={`nav-link ${esActivo('/')}`}
              onClick={() => setMenuAbierto(false)}
            >
              📚 Mis Inscripciones
            </Link>
            <Link
              to="/catalogocursos"
              className={`nav-link ${esActivo('/catalogocursos')}`}
              onClick={() => setMenuAbierto(false)}
            >
              🔍 Explorar Cursos
            </Link>
            <Link
              to="/usuario"
              className={`nav-link ${esActivo('/usuario')}`}
              onClick={() => setMenuAbierto(false)}
            >
              👤 Mi Perfil
            </Link>
          </div>
        </div>

        {/* Sección de usuario */}
        <div className="navbar-user-section">
          {isAuthenticated && usuario ? (
            <>
              <div className="navbar-user-info">
                <span className="user-name">{usuario.nombre || usuario.correo_electronico}</span>
                <span className="user-role">{usuario.role === 'admin' ? 'Administrador' : 'Estudiante'}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', color: '#94a3b8', padding: '0.3rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Botón hamburguesa */}
        <button
          className={`navbar-toggle ${menuAbierto ? 'activo' : ''}`}
          onClick={toggleMenu}
          aria-label="Alternar menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}