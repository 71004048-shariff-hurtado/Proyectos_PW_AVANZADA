import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";

export default function CatalogoCursos() {
  const { courses, setVista, setSelectedCourseId } = useContext(AppContext);

  // Estados de filtros
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [modality, setModality] = useState("Todas");
  const [teacher, setTeacher] = useState("");
  const [duration, setDuration] = useState("");
  const [sortBy, setSortBy] = useState("Más populares");
  const [levelTab, setLevelTab] = useState("Todos");

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setSearch("");
    setCategories([]);
    setModality("Todas");
    setTeacher("");
    setDuration("");
    setLevelTab("Todos");
    setSortBy("Más populares");
  };

  const handleToggleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  // Filtrado de cursos utilizando useMemo
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Filtro por búsqueda
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    // Filtro por categorías seleccionadas
    if (categories.length > 0) {
      result = result.filter(c => categories.includes(c.category));
    }

    // Filtro por modalidad
    if (modality !== "Todas") {
      result = result.filter(c => c.modality.toLowerCase() === modality.toLowerCase() || (modality === "Virtual" && c.modality === "Virtual") || (modality === "Híbrida" && c.modality === "Híbrida"));
    }

    // Filtro por docente
    if (teacher !== "") {
      result = result.filter(c => c.instructor === teacher);
    }

    // Filtro por duración
    if (duration !== "") {
      if (duration === "0 – 20 horas") {
        result = result.filter(c => c.hours <= 20);
      } else if (duration === "20 – 40 horas") {
        result = result.filter(c => c.hours > 20 && c.hours <= 40);
      } else if (duration === "40 – 60 horas") {
        result = result.filter(c => c.hours > 40 && c.hours <= 60);
      } else if (duration === "60+ horas") {
        result = result.filter(c => c.hours > 60);
      }
    }

    // Filtro por nivel (tab)
    if (levelTab !== "Todos") {
      // Mapeamos niveles para propósitos de simulación
      result = result.filter(c => {
        const mappedLevel = c.id === 1 || c.id === 5 ? "Básico" :
                            c.id === 2 || c.id === 3 ? "Intermedio" : "Avanzado";
        return mappedLevel === levelTab;
      });
    }

    // Ordenar resultados
    if (sortBy === "Más populares") {
      result.sort((a, b) => b.studentsCount - a.studentsCount);
    } else if (sortBy === "Mejor valorados") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Precio: menor a mayor") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [courses, search, categories, modality, teacher, duration, levelTab, sortBy]);

  const handleVerCurso = (courseId) => {
    setSelectedCourseId(courseId);
    setVista("detalle-curso");
  };

  // Agrupar conteo de categorías para badges
  const categoryCounts = useMemo(() => {
    const counts = {};
    courses.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [courses]);

  return (
    <main className="page-content">
      {/* PAGE HEADER */}
      <section style={{ background: "linear-gradient(135deg,var(--gray-900),#1e1b4b)", padding: "var(--space-12) 0" }} aria-labelledby="catalog-heading">
        <div className="container">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <a href="#" onClick={(e) => { e.preventDefault(); setVista("inicio"); }}>Inicio</a>
            <span className="separator" aria-hidden="true">›</span>
            <span className="current">Cursos</span>
          </nav>
          <h1 id="catalog-heading" style={{ color: "var(--white)", marginBottom: "var(--space-3)" }}>Catálogo de cursos</h1>
          <p style={{ color: "var(--gray-400)", fontSize: "var(--text-lg)" }}>Explora nuestra oferta académica y encuentra el curso ideal para tu carrera.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "var(--space-8)", alignItems: "start" }} id="catalog-layout">
            
            {/* SIDEBAR FILTROS */}
            <aside aria-label="Filtros de búsqueda" style={{ position: "sticky", top: "calc(var(--navbar-height) + var(--space-4))" }}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title" style={{ fontSize: "var(--text-base)" }}>🔍 Filtros</h3>
                  <button className="btn btn-ghost btn-sm" type="button" aria-label="Limpiar filtros" onClick={handleClearFilters}>Limpiar</button>
                </div>

                {/* Buscador */}
                <div style={{ marginBottom: "var(--space-5)" }}>
                  <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Buscar curso</div>
                  <div className="search-bar">
                    <span aria-hidden="true">🔍</span>
                    <input 
                      type="search" 
                      placeholder="Nombre, docente, tecnología..." 
                      aria-label="Buscar curso" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categorías */}
                <div style={{ marginBottom: "var(--space-5)" }}>
                  <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Categoría</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <label className="checkbox-group">
                      <input 
                        type="checkbox" 
                        checked={categories.length === 0} 
                        onChange={() => setCategories([])} 
                        aria-label="Filtrar por todas las categorías" 
                      /> Todos 
                      <span className="badge badge-gray no-dot" style={{ marginLeft: "auto" }}>{courses.length}</span>
                    </label>
                    {Object.keys(categoryCounts).map(cat => (
                      <label className="checkbox-group" key={cat}>
                        <input 
                          type="checkbox" 
                          checked={categories.includes(cat)} 
                          onChange={() => handleToggleCategory(cat)} 
                          aria-label={`Filtrar ${cat}`} 
                        /> {cat} 
                        <span className={`badge ${cat === "Frontend" ? "badge-primary" : cat === "Backend" ? "badge-success" : cat === "Full Stack" ? "badge-accent" : "badge-gray"} no-dot`} style={{ marginLeft: "auto" }}>{categoryCounts[cat]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Modalidad */}
                <div style={{ marginBottom: "var(--space-5)" }}>
                  <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Modalidad</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    {["Todas", "Virtual", "Presencial", "Híbrida"].map(mod => (
                      <label className="radio-group" key={mod}>
                        <input 
                          type="radio" 
                          name="modalidad" 
                          checked={modality === mod} 
                          onChange={() => setModality(mod)} 
                          aria-label={`Modalidad ${mod}`} 
                        /> {mod}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Docente */}
                <div style={{ marginBottom: "var(--space-5)" }}>
                  <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Docente</div>
                  <select 
                    className="form-control" 
                    aria-label="Seleccionar docente"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  >
                    <option value="">Todos los docentes</option>
                    <option value="Juan Pérez">Juan Pérez</option>
                    <option value="María Torres">María Torres</option>
                    <option value="Luis Ramírez">Luis Ramírez</option>
                  </select>
                </div>

                {/* Duración */}
                <div>
                  <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Duración</div>
                  <select 
                    className="form-control" 
                    aria-label="Seleccionar duración"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="">Cualquier duración</option>
                    <option value="0 – 20 horas">0 – 20 horas</option>
                    <option value="20 – 40 horas">20 – 40 horas</option>
                    <option value="40 – 60 horas">40 – 60 horas</option>
                    <option value="60+ horas">60+ horas</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* RESULTADOS */}
            <div>
              {/* Toolbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-3)" }}>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                  Mostrando <strong>{filteredCourses.length} cursos</strong>
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                  <label htmlFor="sort" className="form-label" style={{ margin: 0, whiteSpace: "nowrap" }}>Ordenar por:</label>
                  <select 
                    id="sort" 
                    className="form-control" 
                    style={{ width: "auto" }} 
                    aria-label="Ordenar cursos"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="Más populares">Más populares</option>
                    <option value="Mejor valorados">Mejor valorados</option>
                    <option value="Precio: menor a mayor">Precio: menor a mayor</option>
                  </select>
                </div>
              </div>

              {/* Tabs por nivel */}
              <div className="tabs" role="tablist" aria-label="Filtrar por nivel">
                {["Todos", "Básico", "Intermedio", "Avanzado"].map(lvl => (
                  <button 
                    key={lvl} 
                    className={`tab-item ${levelTab === lvl ? "active" : ""}`} 
                    role="tab" 
                    aria-selected={levelTab === lvl}
                    onClick={() => setLevelTab(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Grid de cursos */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-3" role="list" aria-label="Listado de cursos">
                  {filteredCourses.map(curso => {
                    const bgGradient = curso.id === 1 ? "linear-gradient(135deg,#1e3a5f,#2563eb)" :
                                       curso.id === 2 ? "linear-gradient(135deg,#1a1a2e,#7c3aed)" :
                                       curso.id === 3 ? "linear-gradient(135deg,#064e3b,#059669)" :
                                       curso.id === 4 ? "linear-gradient(135deg,#431407,#ea580c)" :
                                       curso.id === 5 ? "linear-gradient(135deg,#1e1b4b,#4338ca)" :
                                                        "linear-gradient(135deg,#0c4a6e,#0891b2)";
                    return (
                      <article className="course-card" key={curso.id} role="listitem">
                        <div className="course-card-image" style={{ background: bgGradient }}>
                          <div className="course-thumb-placeholder" aria-hidden="true">{curso.icon}</div>
                          <span className={`course-card-badge badge ${curso.badgeClass} no-dot`}>{curso.category}</span>
                        </div>
                        <div className="course-card-body">
                          <div className="course-category">{curso.category}</div>
                          <h3 className="course-title">{curso.title}</h3>
                          <p className="course-instructor">👨‍🏫 {curso.instructor} · <strong>{curso.rating} ★</strong></p>
                          <div className="course-meta">
                            <span className="course-meta-item">🕒 {curso.hours}h</span>
                            <span className="course-meta-item">📱 {curso.modality}</span>
                            <span className="course-meta-item">👥 {curso.studentsCount}</span>
                          </div>
                        </div>
                        <div className="course-card-footer">
                          <div className="course-price">
                            {curso.price === 0 ? <span className="free">Gratuito</span> : <><span className="currency">S/</span> {curso.price}</>}
                          </div>
                          <a href="#" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); handleVerCurso(curso.id); }}>Ver curso</a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="card" style={{ textAlign: "center", padding: "var(--space-12)" }}>
                  <span style={{ fontSize: "3rem" }} aria-hidden="true">🔍</span>
                  <h3 style={{ marginTop: "var(--space-4)" }}>No se encontraron cursos</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Prueba ajustando los filtros de búsqueda o limpia las selecciones.</p>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: "var(--space-4)", display: "inline-block" }} onClick={handleClearFilters}>Limpiar filtros</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
