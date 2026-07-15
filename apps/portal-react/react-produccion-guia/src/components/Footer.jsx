import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Footer() {
  const { setVista, role } = useContext(AppContext);

  const handleNav = (targetVista) => {
    setVista(targetVista);
  };

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="brand-icon" aria-hidden="true">🎓</div>
              EduTech Academy
            </div>
            <p className="footer-desc">
              Plataforma universitaria de gestión de cursos e inscripciones. Formación tecnológica de calidad para el siglo XXI.
            </p>
          </div>
          <div className="footer-col">
            <h4>Cursos</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>Frontend</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>Backend</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>Full Stack</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>DevOps</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav("cursos"); }}>Seguridad</a>
          </div>
          <div className="footer-col">
            <h4>Plataforma</h4>
            {role === "guest" ? (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav("login"); }}>Iniciar sesión</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav("registro"); }}>Registrarse</a>
              </>
            ) : (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav("dashboard"); }}>Mi panel</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav("mis-inscripciones"); }}>Mis inscripciones</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav("perfil"); }}>Perfil</a>
              </>
            )}
          </div>
          <div className="footer-col">
            <h4>Soporte</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>Centro de ayuda</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Preguntas frecuentes</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Política de privacidad</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Términos de uso</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contacto</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 EduTech Academy. Todos los derechos reservados.</span>
          <span>Construido para el curso de Ingeniería de Software y Desarrollo Web</span>
        </div>
      </div>
    </footer>
  );
}
