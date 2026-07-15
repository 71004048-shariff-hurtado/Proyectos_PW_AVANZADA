import React from "react";

export default function AdminDocentes() {
  const teachers = [
    { name: "Juan Pérez", specialty: "Especialista Frontend", status: "Activo", courses: 2, avatar: "JP" },
    { name: "María Torres", specialty: "Arquitecta Full Stack", status: "Activo", courses: 2, avatar: "MT" },
    { name: "Luis Ramírez", specialty: "Ingeniero DevOps", status: "Activo", courses: 2, avatar: "LR" }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gestión de docentes</h1>
        <p className="page-subtitle">Docentes registrados en la academia y estado de su carga académica.</p>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table" aria-label="Listado administrativo de docentes">
            <thead>
              <tr>
                <th>Docente</th>
                <th>Especialidad</th>
                <th>Estado</th>
                <th>Cursos a cargo</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar" aria-hidden="true" style={idx === 1 ? { background: "linear-gradient(135deg,#7c3aed,#ec4899)" } : idx === 2 ? { background: "linear-gradient(135deg,#059669,#0891b2)" } : {}}>{t.avatar}</div>
                      <div className="user-info">
                        <div className="name">{t.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{t.specialty}</td>
                  <td><span className="badge badge-success">Activo</span></td>
                  <td>{t.courses} cursos</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
