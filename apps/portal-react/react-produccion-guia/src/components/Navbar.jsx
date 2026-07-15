import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { role, vista, setVista, user, logout } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNav = (targetVista) => {
    setVista(targetVista);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  // Render condicional de la marca/logo según el rol
  const renderBrand = () => {
    if (role === "admin") {
      return (
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>
          <div className="brand-icon" aria-hidden="true">🎓</div>
          <span>Edu<em>Tech</em> <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, background: "var(--danger-600)", color: "var(--white)", padding: "2px 8px", borderRadius: "var(--border-radius-full)", letterSpacing: ".5px" }}>ADMIN</span></span>
        </a>
      );
    }
    return (
      <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); handleNav("inicio"); }}>
        <div className="brand-icon" aria-hidden="true">🎓</div>
        <span>Edu<em>Tech</em></span>
      </a>
    );
  };

  // Render condicional del menú de navegación (escritorio)
  const renderNavLinks = () => {
    if (role === "admin") {
      return (
        <ul className="navbar-nav" role="list">
          <li><a href="#" className={vista === "dashboard" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>Dashboard</a></li>
          <li><a href="#" className={vista === "admin-cursos" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("admin-cursos"); }}>Cursos</a></li>
          <li><a href="#" className={vista === "admin-estudiantes" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("admin-estudiantes"); }}>Estudiantes</a></li>
          <li><a href="#" className={vista === "admin-docentes" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("admin-docentes"); }}>Docentes</a></li>
        </ul>
      );
    }

    if (role === "student") {
      return (
        <ul className="navbar-nav" role="list">
          <li><a href="#" className={vista === "dashboard" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>Mi panel</a></li>
          <li><a href="#" className={vista === "cursos" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>Explorar cursos</a></li>
          <li><a href="#" className={vista === "mis-inscripciones" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("mis-inscripciones"); }}>Mis inscripciones</a></li>
        </ul>
      );
    }

    // Rol visitante (guest)
    return (
      <ul className="navbar-nav" role="list">
        <li><a href="#" className={vista === "inicio" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("inicio"); }}>Inicio</a></li>
        <li><a href="#" className={vista === "cursos" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>Cursos</a></li>
        <li><a href="#beneficios" onClick={() => handleNav("inicio")}>Beneficios</a></li>
      </ul>
    );
  };

  // Render condicional de los botones de acción en el extremo derecho
  const renderActions = () => {
    if (role === "guest") {
      return (
        <div className="navbar-actions">
          <a href="#" className="btn btn-ghost btn-sm" onClick={(e) => { e.preventDefault(); handleNav("login"); }}>Iniciar sesión</a>
          <a href="#" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); handleNav("registro"); }}>Registrarse</a>
          <button className={`hamburger ${mobileMenuOpen ? "open" : ""}`} onClick={toggleMobileMenu} aria-label="Abrir menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      );
    }

    // Para estudiantes y administradores, mostramos el avatar de usuario
    const userAvatar = role === "admin" ? "AD" : (user?.avatar || "US");
    const userName = role === "admin" ? "Admin" : (user?.name ? `${user.name.split(" ")[0]} G.` : "Usuario");

    return (
      <div className="navbar-actions" style={{ position: "relative" }}>
        <div 
          className="navbar-user" 
          tabIndex="0" 
          role="button" 
          aria-label={`Menú de usuario de ${userName}`}
          onClick={toggleDropdown}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--space-2)" }}
        >
          <div className="avatar" aria-hidden="true" style={role === "admin" ? { background: "linear-gradient(135deg,var(--danger-600),#9333ea)" } : {}}>
            {userAvatar}
          </div>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--gray-700)" }}>{userName}</span>
          <span aria-hidden="true" style={{ color: "var(--gray-400)" }}>▾</span>
        </div>

        {/* Dropdown del usuario */}
        {dropdownOpen && (
          <div className="card" style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "200px",
            zIndex: 100,
            padding: "var(--space-2)",
            boxShadow: "var(--shadow-lg)"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              {role === "student" && (
                <>
                  <a href="#" className="btn btn-ghost btn-sm w-full" style={{ justifyContent: "flex-start" }} onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>🏠 Mi panel</a>
                  <a href="#" className="btn btn-ghost btn-sm w-full" style={{ justifyContent: "flex-start" }} onClick={(e) => { e.preventDefault(); handleNav("perfil"); }}>👤 Mi perfil</a>
                  <div className="divider" style={{ margin: "var(--space-1) 0" }}></div>
                </>
              )}
              {role === "admin" && (
                <>
                  <a href="#" className="btn btn-ghost btn-sm w-full" style={{ justifyContent: "flex-start" }} onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>📊 Dashboard</a>
                  <div className="divider" style={{ margin: "var(--space-1) 0" }}></div>
                </>
              )}
              <button 
                className="btn btn-ghost btn-sm w-full" 
                style={{ justifyContent: "flex-start", color: "var(--danger-600)" }} 
                onClick={logout}
              >
                🚪 Cerrar sesión
              </button>
            </div>
          </div>
        )}

        <button className={`hamburger ${mobileMenuOpen ? "open" : ""}`} onClick={toggleMobileMenu} aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    );
  };

  // Render condicional del menú móvil
  const renderMobileNav = () => {
    if (!mobileMenuOpen) return null;

    if (role === "admin") {
      return (
        <div className="mobile-nav open" id="mobile-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>📊 Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("admin-cursos"); }}>📚 Cursos</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("admin-estudiantes"); }}>👥 Estudiantes</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("admin-docentes"); }}>👨‍🏫 Docentes</a>
          <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} style={{ color: "var(--danger-600)" }}>🚪 Cerrar sesión</a>
        </div>
      );
    }

    if (role === "student") {
      return (
        <div className="mobile-nav open" id="mobile-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>🏠 Mi panel</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>📚 Explorar cursos</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("mis-inscripciones"); }}>📋 Mis inscripciones</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("perfil"); }}>👤 Mi perfil</a>
          <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} style={{ color: "var(--danger-600)" }}>🚪 Cerrar sesión</a>
        </div>
      );
    }

    return (
      <div className="mobile-nav open" id="mobile-nav">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav("inicio"); }}>🏠 Inicio</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>📚 Cursos</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav("login"); }}>🚪 Iniciar sesión</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav("registro"); }}>👤 Registrarse</a>
      </div>
    );
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Navegación principal">
        <div className="container">
          {renderBrand()}
          {renderNavLinks()}
          {renderActions()}
        </div>
      </nav>
      {renderMobileNav()}
    </>
  );
}
