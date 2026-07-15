import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function DetalleCurso() {
  const { selectedCourseId, courses, inscribirseCurso, setVista, role } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState(0);

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleEnroll = () => {
    inscribirseCurso(course.id);
  };

  const sections = [
    { title: "Módulo 1: Introducción y Fundamentos", items: ["Conceptos clave y arquitectura", "Instalación del entorno de desarrollo", "Primeros pasos y sintaxis básica"] },
    { title: "Módulo 2: Estructuras y Flujos", items: ["Control de flujo y condicionales", "Estructuras de datos y colecciones", "Ejercicios prácticos de lógica"] },
    { title: "Módulo 3: Integración y Buenas Prácticas", items: ["Diseño de componentes reutilizables", "Manejo de errores y debugging", "Proyecto integrador final"] }
  ];

  return (
    <main className="page-content">
      <section style={{ background: "linear-gradient(135deg,var(--gray-900),#312e81)", padding: "var(--space-10) 0", color: "var(--white)" }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <a href="#" onClick={(e) => { e.preventDefault(); setVista("inicio"); }} style={{ color: "var(--gray-400)" }}>Inicio</a>
            <span className="separator" aria-hidden="true" style={{ color: "var(--gray-600)" }}>›</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setVista("cursos"); }} style={{ color: "var(--gray-400)" }}>Cursos</a>
            <span className="separator" aria-hidden="true" style={{ color: "var(--gray-600)" }}>›</span>
            <span className="current">{course.title}</span>
          </nav>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "var(--space-8)", marginTop: "var(--space-6)", alignItems: "center" }}>
            <div>
              <span className={`badge ${course.badgeClass} no-dot`} style={{ marginBottom: "var(--space-4)" }}>{course.category}</span>
              <h1 style={{ color: "var(--white)", fontSize: "var(--text-3xl)", marginBottom: "var(--space-4)" }}>{course.title}</h1>
              <p style={{ color: "var(--gray-300)", fontSize: "var(--text-lg)", marginBottom: "var(--space-4)" }}>{course.description}</p>
              <p>👨‍🏫 Docente principal: <strong>{course.instructor}</strong> · ⭐ {course.rating} de valoración</p>
            </div>
            <div className="card" style={{ color: "var(--gray-900)", padding: "var(--space-6)" }}>
              <div style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", color: "var(--gray-500)", fontWeight: 700 }}>Inversión única</div>
              <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800, margin: "var(--space-2) 0 var(--space-4)" }}>
                {course.price === 0 ? <span style={{ color: "var(--success-600)" }}>Gratuito</span> : `S/ ${course.price}`}
              </div>
              <button className="btn btn-primary btn-lg w-full" onClick={handleEnroll}>
                {role === "student" ? "Matricularme ahora" : "Iniciar sesión para inscribirme"}
              </button>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--gray-500)", textAlign: "center", marginTop: "var(--space-3)" }}>
                ✓ Acceso de por vida · Certificación incluida
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "var(--space-8)", alignItems: "start" }}>
            <div>
              <h2>Temario del curso</h2>
              <p style={{ marginBottom: "var(--space-6)" }}>Despliega cada módulo para conocer los temas detallados que aprenderás.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {sections.map((sec, idx) => (
                  <div key={idx} className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <button 
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: "var(--space-4)",
                        textAlign: "left",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        fontSize: "var(--text-base)"
                      }}
                      onClick={() => setActiveSection(activeSection === idx ? -1 : idx)}
                    >
                      <span>{sec.title}</span>
                      <span>{activeSection === idx ? "▼" : "▶"}</span>
                    </button>
                    {activeSection === idx && (
                      <ul style={{ padding: "0 var(--space-4) var(--space-4) var(--space-6)", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                        {sec.items.map((item, itemIdx) => (
                          <li key={itemIdx} style={{ fontSize: "var(--text-sm)", color: "var(--gray-700)" }}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <aside>
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <h4>Detalles adicionales</h4>
                <div>
                  <strong>Duración:</strong> {course.hours} horas cronológicas
                </div>
                <div>
                  <strong>Modalidad:</strong> {course.modality}
                </div>
                <div>
                  <strong>Nivel sugerido:</strong> {course.id === 1 || course.id === 5 ? "Básico" : course.id === 2 || course.id === 3 ? "Intermedio" : "Avanzado"}
                </div>
                <div>
                  <strong>Estudiantes inscritos:</strong> {course.studentsCount} alumnos registrados
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
