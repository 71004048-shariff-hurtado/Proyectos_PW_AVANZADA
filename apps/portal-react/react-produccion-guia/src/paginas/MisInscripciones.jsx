import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MisInscripciones() {
  const { enrollments, courses, setVista } = useContext(AppContext);

  const handleDescargar = (courseTitle) => {
    alert(`Descargando certificado de: ${courseTitle}`);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Mis inscripciones</h1>
            <p className="page-subtitle">Revisa el historial de tus cursos matriculados, calificaciones y descarga tus certificados académicos.</p>
          </div>
          <div>
            <button className="btn btn-primary btn-sm" onClick={() => setVista("cursos")}>Matricularme en otro curso</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table" aria-label="Historial de cursos matriculados">
            <thead>
              <tr>
                <th scope="col">Curso</th>
                <th scope="col">Docente</th>
                <th scope="col">Progreso / Nota</th>
                <th scope="col">Asistencia</th>
                <th scope="col">Certificado</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enr) => {
                const course = courses.find(c => c.id === enr.courseId);
                if (!course) return null;
                const isCompleted = enr.progress === 100;
                return (
                  <tr key={enr.courseId}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar" aria-hidden="true">{course.icon}</div>
                        <div className="user-info">
                          <div className="name">{course.title}</div>
                          <div className="sub">{course.category} · {course.hours}h</div>
                        </div>
                      </div>
                    </td>
                    <td>{course.instructor}</td>
                    <td>
                      <div>
                        <strong>{isCompleted ? `Nota: ${enr.grade || 18}` : "En progreso"}</strong>
                        <div className="progress-bar-bg" style={{ marginTop: "4px", width: "120px" }} aria-label={`Progreso: ${enr.progress}%`}>
                          <div className={`progress-bar ${isCompleted ? "success" : ""}`} style={{ width: `${enr.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td>{isCompleted ? "100%" : "90%"}</td>
                    <td>
                      {isCompleted ? (
                        <button 
                          className="btn btn-success btn-xs" 
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                          onClick={() => handleDescargar(course.title)}
                        >
                          📥 Descargar
                        </button>
                      ) : (
                        <span style={{ color: "var(--gray-400)", fontSize: "var(--text-xs)" }}>No disponible</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
