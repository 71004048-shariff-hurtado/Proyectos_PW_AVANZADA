import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function AdminCursos() {
  const { courses, setCourses } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");
  const [newInstructor, setNewInstructor] = useState("Juan Pérez");
  const [newPrice, setNewPrice] = useState("");
  const [newHours, setNewHours] = useState("");

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newHours) return;

    const newCourseObj = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      instructor: newInstructor,
      rating: 5.0,
      hours: parseInt(newHours, 10),
      modality: "Virtual",
      studentsCount: 0,
      price: parseFloat(newPrice),
      badgeClass: newCategory === "Frontend" ? "badge-primary" : newCategory === "Backend" ? "badge-success" : "badge-accent",
      icon: "📚",
      description: "Curso agregado desde el panel de administración."
    };

    setCourses([...courses, newCourseObj]);
    setShowAddForm(false);
    setNewTitle("");
    setNewPrice("");
    setNewHours("");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Gestión de cursos</h1>
            <p className="page-subtitle">Administra los cursos de la academia, edita su información o añade nuevos cursos.</p>
          </div>
          <div>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancelar" : "+ Nuevo curso"}
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: "var(--space-6)" }}>
          <h3 className="card-title" style={{ marginBottom: "var(--space-4)" }}>Nuevo Curso</h3>
          <form onSubmit={handleAddCourse} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Título del curso</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej. React Avanzado" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select className="form-control" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Seguridad">Seguridad</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Docente</label>
              <select className="form-control" value={newInstructor} onChange={(e) => setNewInstructor(e.target.value)}>
                <option value="Juan Pérez">Juan Pérez</option>
                <option value="María Torres">María Torres</option>
                <option value="Luis Ramírez">Luis Ramírez</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Precio (S/)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ej. 150" 
                value={newPrice} 
                onChange={(e) => setNewPrice(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Duración (horas)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ej. 40" 
                value={newHours} 
                onChange={(e) => setNewHours(e.target.value)} 
                required 
              />
            </div>
            <div style={{ gridColumn: "span 2", textAlign: "right" }}>
              <button type="submit" className="btn btn-primary">Guardar curso</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-wrapper">
          <table className="table" aria-label="Listado administrativo de cursos">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Docente</th>
                <th>Precio</th>
                <th>Duración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.title}</div>
                    <span className={`badge ${c.badgeClass} no-dot`}>{c.category}</span>
                  </td>
                  <td>{c.instructor}</td>
                  <td>{c.price === 0 ? "Gratuito" : `S/ ${c.price}`}</td>
                  <td>{c.hours} horas</td>
                  <td>
                    <button 
                      className="btn btn-ghost btn-xs" 
                      style={{ color: "var(--danger-600)" }}
                      onClick={() => handleDelete(c.id)}
                    >
                      🗑️ Eliminar
                    </button>
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
