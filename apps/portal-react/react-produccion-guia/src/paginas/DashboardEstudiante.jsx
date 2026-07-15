import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function DashboardEstudiante() {
  const { user, enrollments, courses, setVista, setSelectedCourseId } = useContext(AppContext);

  const studentName = user?.name || "Carlos García";

  // Calcular métricas
  const totalInscritos = enrollments.length;
  const completados = enrollments.filter(e => e.progress === 100 || e.grade !== null).length;
  const horasTotales = enrollments.reduce((acc, curr) => {
    const course = courses.find(c => c.id === curr.courseId);
    return acc + (course ? course.hours : 0);
  }, 0);

  const handleVerCurso = (courseId) => {
    setSelectedCourseId(courseId);
    setVista("detalle-curso");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">¡Hola de nuevo, {studentName}!</h1>
            <p className="page-subtitle">Qué bueno tenerte de vuelta. Aquí está el resumen de tu progreso académico.</p>
          </div>
          <div>
            <button className="btn btn-primary btn-sm" onClick={() => setVista("cursos")}>🔍 Explorar nuevos cursos</button>
          </div>
        </div>
      </div>

      {/* METRICAS */}
      <div className="grid grid-4" style={{ marginBottom: "var(--space-8)" }} role="list" aria-label="Métricas del estudiante">
        <div className="stat-card" role="listitem">
          <div className="stat-icon blue" aria-hidden="true">📚</div>
          <div className="stat-content">
            <div className="stat-label">Cursos inscritos</div>
            <div className="stat-value">{totalInscritos}</div>
            <div className="stat-change up">Activos este ciclo</div>
          </div>
        </div>
        <div className="stat-card" role="listitem">
          <div className="stat-icon green" aria-hidden="true">🏆</div>
          <div className="stat-content">
            <div className="stat-label">Cursos completados</div>
            <div className="stat-value">{completados}</div>
            <div className="stat-change up">Con certificación</div>
          </div>
        </div>
        <div className="stat-card" role="listitem">
          <div className="stat-icon purple" aria-hidden="true">🕒</div>
          <div className="stat-content">
            <div className="stat-label">Horas lectivas</div>
            <div className="stat-value">{horasTotales}h</div>
            <div className="stat-change up">Acumuladas</div>
          </div>
        </div>
        <div className="stat-card" role="listitem">
          <div className="stat-icon yellow" aria-hidden="true">🎓</div>
          <div className="stat-content">
            <div className="stat-label">Certificados listos</div>
            <div className="stat-value">{completados}</div>
            <div className="stat-change up">Descargables</div>
          </div>
        </div>
      </div>

      {/* CURSOS EN PROGRESO */}
      <div className="card" style={{ marginBottom: "var(--space-8)" }}>
        <div className="card-header">
          <h2 className="card-title">Cursos en progreso</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {enrollments.map((enr) => {
            const course = courses.find(c => c.id === enr.courseId);
            if (!course) return null;
            return (
              <div 
                key={enr.courseId} 
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 180px 120px",
                  gap: "var(--space-4)",
                  alignItems: "center",
                  padding: "var(--space-3)",
                  background: "var(--gray-50)",
                  borderRadius: "var(--border-radius-lg)"
                }}
              >
                <div style={{ fontSize: "2rem", textAlign: "center" }} aria-hidden="true">{course.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "var(--text-base)" }}>{course.title}</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--gray-500)" }}>Docente: {course.instructor}</div>
                </div>
                <div>
                  <div className="progress-bar-bg" aria-label={`Progreso: ${enr.progress}%`}>
                    <div 
                      className={`progress-bar ${enr.progress === 100 ? "success" : ""}`} 
                      style={{ width: `${enr.progress}%` }}
                    ></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", marginTop: "var(--space-1)", fontWeight: 600 }}>
                    <span>Progreso</span>
                    <span>{enr.progress}%</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleVerCurso(course.id)}>
                    {enr.progress === 100 ? "Revisar" : "Continuar →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CLASES PROXIMAS Y RECOMENDADOS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Próximas clases en vivo</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ borderLeft: "4px solid var(--primary-600)", paddingLeft: "var(--space-3)" }}>
              <div style={{ fontWeight: 700, fontSize: "var(--text-sm)" }}>Desarrollo Frontend con React</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--gray-500)" }}>Hoy, 19:00 - Sesión 12: Estado global y Context</div>
            </div>
            <div style={{ borderLeft: "4px solid var(--accent-600)", paddingLeft: "var(--space-3)" }}>
              <div style={{ fontWeight: 700, fontSize: "var(--text-sm)" }}>Backend con Node.js</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--gray-500)" }}>Mañana, 18:30 - Sesión 8: Middlewares y Seguridad</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recomendado para ti</h3>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
            <span style={{ fontSize: "2rem" }} aria-hidden="true">🔐</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "var(--text-sm)" }}>Seguridad en Aplicaciones Web</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--gray-500)" }}>Lleva tu desarrollo al siguiente nivel protegiendo tus APIS.</div>
              <button 
                className="btn btn-ghost btn-xs" 
                style={{ marginTop: "var(--space-2)", color: "var(--primary-600)", padding: 0 }}
                onClick={() => handleVerCurso(4)}
              >
                Ver detalles del curso →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
