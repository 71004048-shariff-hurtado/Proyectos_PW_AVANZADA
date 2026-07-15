import React from "react";

export default function AdminEstudiantes() {
  const students = [
    { name: "Carlos García", career: "Ingeniería de Sistemas", email: "carlos@correo.edu.pe", status: "Activo", avatar: "CG" },
    { name: "Andrea López", career: "Ingeniería Informática", email: "andrea@correo.edu.pe", status: "Activo", avatar: "AL" },
    { name: "Roberto Méndez", career: "Ingeniería de Software", email: "roberto@correo.edu.pe", status: "Pendiente", avatar: "RM" }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gestión de estudiantes</h1>
        <p className="page-subtitle">Listado de alumnos matriculados y control de estado de acceso.</p>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table" aria-label="Listado administrativo de estudiantes">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Programa Académico</th>
                <th>Correo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar" aria-hidden="true" style={idx === 1 ? { background: "linear-gradient(135deg,#7c3aed,#ec4899)" } : idx === 2 ? { background: "linear-gradient(135deg,#059669,#0891b2)" } : {}}>{s.avatar}</div>
                      <div className="user-info">
                        <div className="name">{s.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.career}</td>
                  <td>{s.email}</td>
                  <td>
                    <span className={`badge ${s.status === "Activo" ? "badge-success" : "badge-warning"}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
