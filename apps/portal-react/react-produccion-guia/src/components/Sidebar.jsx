import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Sidebar() {
  const { role, vista, setVista, user, logout, enrollments, courses } = useContext(AppContext);

  const handleNav = (targetVista) => {
    setVista(targetVista);
  };

  if (role === "admin") {
    return (
      <aside className="sidebar" id="sidebar" aria-label="Menú de administración">
        <div className="sidebar-header">
          <div className="sidebar-user">
            <div className="avatar" style={{ background: "linear-gradient(135deg, var(--danger-600), #9333ea)" }} aria-label="Administrador">AD</div>
            <div className="user-info">
              <div className="name">Administrador</div>
              <div className="role">Super Admin</div>
            </div>
          </div>
          <div className="sidebar-title">Panel de control</div>
        </div>
        <nav className="sidebar-nav" aria-label="Navegación administrativa">
          <a 
            href="#" 
            className={vista === "dashboard" ? "active" : ""} 
            onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}
          >
            <span className="nav-icon" aria-hidden="true">📊</span> Dashboard
          </a>

          <div className="sidebar-section-label">Gestión académica</div>
          <a 
            href="#" 
            className={vista === "admin-cursos" ? "active" : ""} 
            onClick={(e) => { e.preventDefault(); handleNav("admin-cursos"); }}
          >
            <span className="nav-icon" aria-hidden="true">📚</span> Cursos
            <span className="sidebar-badge">{courses.length}</span>
          </a>
          <a 
            href="#" 
            className={vista === "admin-estudiantes" ? "active" : ""} 
            onClick={(e) => { e.preventDefault(); handleNav("admin-estudiantes"); }}
          >
            <span className="nav-icon" aria-hidden="true">👥</span> Estudiantes
            <span className="sidebar-badge">1240</span>
          </a>
          <a 
            href="#" 
            className={vista === "admin-docentes" ? "active" : ""} 
            onClick={(e) => { e.preventDefault(); handleNav("admin-docentes"); }}
          >
            <span className="nav-icon" aria-hidden="true">👨‍🏫</span> Docentes
            <span className="sidebar-badge">12</span>
          </a>

          <div className="sidebar-section-label">Sistema</div>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); logout(); }}
          >
            <span className="nav-icon" aria-hidden="true">🚪</span> Cerrar sesión
          </a>
        </nav>
      </aside>
    );
  }

  // Si es estudiante
  const studentName = user?.name || "Carlos García";
  const studentCarrera = user?.carrera || "Ingeniería de Sistemas";
  const studentAvatar = user?.avatar || "CG";
  const activeEnrollmentsCount = enrollments.length;

  return (
    <aside className="sidebar" id="sidebar" aria-label="Menú lateral del estudiante">
      <div className="sidebar-header">
        <div className="sidebar-user">
          <div className="avatar" aria-label={`Foto de ${studentName}`}>{studentAvatar}</div>
          <div className="user-info">
            <div className="name">{studentName}</div>
            <div className="role">{studentCarrera}</div>
          </div>
        </div>
        <div className="sidebar-title">Panel estudiantil</div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación del panel">
        <a 
          href="#" 
          className={vista === "dashboard" ? "active" : ""} 
          onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}
        >
          <span className="nav-icon" aria-hidden="true">🏠</span> Inicio
        </a>
        <a 
          href="#" 
          className={vista === "mis-inscripciones" ? "active" : ""} 
          onClick={(e) => { e.preventDefault(); handleNav("mis-inscripciones"); }}
        >
          <span className="nav-icon" aria-hidden="true">📚</span> Mis inscripciones
          <span className="sidebar-badge">{activeEnrollmentsCount}</span>
        </a>
        <a 
          href="#" 
          className={vista === "cursos" ? "active" : ""} 
          onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}
        >
          <span className="nav-icon" aria-hidden="true">🔍</span> Explorar
        </a>

        <div className="sidebar-section-label">Cuenta</div>
        <a 
          href="#" 
          className={vista === "perfil" ? "active" : ""} 
          onClick={(e) => { e.preventDefault(); handleNav("perfil"); }}
        >
          <span className="nav-icon" aria-hidden="true">👤</span> Mi perfil
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); logout(); }}
        >
          <span className="nav-icon" aria-hidden="true">🚪</span> Cerrar sesión
        </a>
      </nav>
    </aside>
  );
}
