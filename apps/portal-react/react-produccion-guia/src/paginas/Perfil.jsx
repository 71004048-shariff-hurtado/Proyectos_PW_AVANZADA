import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Perfil() {
  const { user, setUser } = useContext(AppContext);
  const [nombre, setNombre] = useState(user?.name || "Carlos García");
  const [carrera, setCarrera] = useState(user?.carrera || "Ingeniería de Sistemas");
  const [email, setEmail] = useState(user?.email || "carlos@correo.edu.pe");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: nombre,
      carrera: carrera,
      email: email,
      avatar: nombre.substring(0, 2).toUpperCase()
    });
    setSuccessMsg("¡Perfil actualizado con éxito!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Mi perfil</h1>
        <p className="page-subtitle">Modifica la información de tu cuenta y actualiza tus preferencias de estudiante.</p>
      </div>

      {successMsg && (
        <div className="alert alert-success" role="alert" style={{ marginBottom: "var(--space-6)" }}>
          <span className="alert-icon" aria-hidden="true">✓</span>
          <div className="alert-content">
            <div>{successMsg}</div>
          </div>
        </div>
      )}

      <div className="card" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSave} aria-label="Formulario de perfil">
          <div className="form-group" style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
            <div className="avatar xl" style={{ margin: "0 auto var(--space-3)" }}>
              {nombre.substring(0, 2).toUpperCase()}
            </div>
            <div style={{ fontWeight: 700, fontSize: "var(--text-lg)" }}>{nombre}</div>
            <div style={{ color: "var(--gray-500)", fontSize: "var(--text-sm)" }}>{carrera}</div>
          </div>

          <div className="form-group">
            <label htmlFor="p-nombre" className="form-label">Nombre y Apellidos</label>
            <input 
              type="text" 
              id="p-nombre" 
              className="form-control" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="p-email" className="form-label">Correo electrónico</label>
            <input 
              type="email" 
              id="p-email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="p-carrera" className="form-label">Carrera / Programa</label>
            <select 
              id="p-carrera" 
              className="form-control" 
              value={carrera} 
              onChange={(e) => setCarrera(e.target.value)}
            >
              <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
              <option value="Ingeniería de Software">Ingeniería de Software</option>
              <option value="Ciencias de la Computación">Ciencias de la Computación</option>
              <option value="Ingeniería Informática">Ingeniería Informática</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "var(--space-4)" }}>
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
