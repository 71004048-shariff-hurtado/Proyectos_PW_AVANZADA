import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CursosProvider } from './context/CursosContext';
import CursosDelEstudiante from './pages/CursosDelEstudiante';
import CatalogoCursos from './pages/CatalogoCursos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Usuario from './components/Usuario';
import Navbar from './components/Navbar';
import './App.css';

/**
 * Componente de ruta protegida.
 * Si no está autenticado, redirige al login.
 */
function RutaProtegida({ children }) {
  const { isAuthenticated, cargandoSesion } = useAuth();

  if (cargandoSesion) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#94a3b8',
        fontSize: '1.1rem',
      }}>
        ⏳ Cargando sesión...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

/**
 * Rutas que NO deben verse si ya estás autenticado (login, registro).
 */
function RutaPublica({ children }) {
  const { isAuthenticated, cargandoSesion } = useAuth();
  if (cargandoSesion) return null;
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas (solo sin sesión) */}
        <Route path="/login" element={<RutaPublica><Login /></RutaPublica>} />
        <Route path="/registro" element={<RutaPublica><Registro /></RutaPublica>} />

        {/* Rutas protegidas (requieren sesión) */}
        <Route path="/" element={<RutaProtegida><CursosDelEstudiante /></RutaProtegida>} />
        <Route path="/catalogocursos" element={<RutaProtegida><CatalogoCursos /></RutaProtegida>} />
        <Route path="/usuario" element={<RutaProtegida><Usuario /></RutaProtegida>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CursosProvider>
        <AppRoutes />
      </CursosProvider>
    </AuthProvider>
  );
}
