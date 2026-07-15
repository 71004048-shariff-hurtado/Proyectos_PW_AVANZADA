import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AdminDashboard() {
  const { courses, setVista } = useContext(AppContext);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Dashboard administrativo</h1>
            <p className="page-subtitle">Resumen general del sistema de EduTech Academy.</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => alert("Exportando datos...")}>📥 Exportar reporte</button>
            <button className="btn btn-primary btn-sm" onClick={() => setVista("admin-cursos")}>+ Nuevo curso</button>
          </div>
        </div>
      </div>

      {/* Alert de atención */}
      <div className="alert alert-warning" style={{ marginBottom: "var(--space-6)" }} role="alert">
        <span className="alert-icon" aria-hidden="true">⚠️</span>
        <div className="alert-content">
          <div className="alert-title">Atención requerida</div>
          <div>Hay 3 solicitudes de inscripción pendientes de aprobación y 1 docente con verificación incompleta.</div>
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-4" style={{ marginBottom: "var(--space-6)" }}>
        <div className="stat-card">
          <div className="stat-icon blue">📚</div>
          <div className="stat-content">
            <div className="stat-label">Total cursos</div>
            <div className="stat-value">{courses.length}</div>
            <div className="stat-change up">↑ +3 este mes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">👥</div>
          <div className="stat-content">
            <div className="stat-label">Total estudiantes</div>
            <div className="stat-value">1,240</div>
            <div className="stat-change up">↑ +87 este mes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">👨‍🏫</div>
          <div className="stat-content">
            <div className="stat-label">Total docentes</div>
            <div className="stat-value">12</div>
            <div className="stat-change up">↑ +1 este mes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">📋</div>
          <div className="stat-content">
            <div className="stat-label">Inscripciones activas</div>
            <div className="stat-value">3,182</div>
            <div className="stat-change up">↑ +214 este mes</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
        
        {/* Cursos populares */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Cursos con más inscritos</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {courses.slice(0, 3).map((c, idx) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary-100)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "var(--primary-600)" }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{c.title}</div>
                  <div className="progress-bar-bg" style={{ marginTop: "4px" }}>
                    <div className="progress-bar" style={{ width: `${80 - idx * 20}%` }}></div>
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: "var(--primary-600)" }}>{c.studentsCount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Accesos rápidos</h2>
          </div>
          <div className="quick-access-grid">
            <a href="#" className="quick-card" onClick={(e) => { e.preventDefault(); setVista("admin-cursos"); }}>
              <div className="icon">📚</div>
              <div className="label">Cursos</div>
            </a>
            <a href="#" className="quick-card" onClick={(e) => { e.preventDefault(); setVista("admin-estudiantes"); }}>
              <div className="icon">👥</div>
              <div className="label">Estudiantes</div>
            </a>
            <a href="#" className="quick-card" onClick={(e) => { e.preventDefault(); setVista("admin-docentes"); }}>
              <div className="icon">👨‍🏫</div>
              <div className="label">Docentes</div>
            </a>
            <a href="#" className="quick-card" onClick={(e) => { e.preventDefault(); alert("Vista en desarrollo por colega."); }}>
              <div className="icon">🏆</div>
              <div className="label">Certificados</div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
