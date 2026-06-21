import { useState, useEffect } from 'react';
import TarjetaCurso from '../components/TarjetaCurso';
import { useCursos } from '../hooks/useCursos';
import '../styles/CatalogoCursos.css';

export default function CatalogoCursos() {
  const { obtenerTodosCursos, filtrarPorCategoria, filtrarPorModalidad, buscarCursos } = useCursos();
  
  const [cursosMostrados, setCursosMostrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [modalidadFiltro, setModalidadFiltro] = useState('Todas');
  const [ordenamiento, setOrdenamiento] = useState('popular');

  // Categorías y modalidades disponibles
  const categorias = ['Todos', 'Frontend', 'Backend', 'Full Stack', 'Seguridad', 'Base de Datos', 'DevOps'];
  const modalidades = ['Todas', 'Virtual', 'Presencial', 'Híbrida'];

  // Aplicar filtros y búsqueda
  useEffect(() => {
    let cursos = obtenerTodosCursos();

    // Aplicar búsqueda
    if (busqueda.trim()) {
      cursos = buscarCursos(busqueda);
    }

    // Aplicar filtro de categoría
    if (categoriaFiltro !== 'Todos') {
      cursos = cursos.filter(c => c.categoria === categoriaFiltro);
    }

    // Aplicar filtro de modalidad
    if (modalidadFiltro !== 'Todas') {
      cursos = cursos.filter(c => c.modalidad === modalidadFiltro);
    }

    // Aplicar ordenamiento
    const cursoOrdenados = [...cursos];
    switch (ordenamiento) {
      case 'popular':
        cursoOrdenados.sort((a, b) => b.estudiantes - a.estudiantes);
        break;
      case 'mejor-calificados':
        cursoOrdenados.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'mas-recientes':
        cursoOrdenados.reverse();
        break;
      case 'precio-menor':
        cursoOrdenados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-mayor':
        cursoOrdenados.sort((a, b) => b.precio - a.precio);
        break;
      default:
        break;
    }

    setCursosMostrados(cursoOrdenados);
  }, [busqueda, categoriaFiltro, modalidadFiltro, ordenamiento, obtenerTodosCursos, buscarCursos]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaFiltro('Todos');
    setModalidadFiltro('Todas');
    setOrdenamiento('popular');
  };

  return (
    <div className="catalogo-container">
      <header className="catalogo-header">
        <div className="header-content">
          <h1>Catálogo de Cursos</h1>
          <p>Explora nuestra oferta académica y encuentra el curso ideal para tu carrera.</p>
        </div>
      </header>

      <div className="catalogo-layout">
        {/* SIDEBAR - Filtros */}
        <aside className="catalogo-sidebar">
          <div className="filtros-card">
            <div className="filtros-header">
              <h3>🔍 Filtros</h3>
              <button className="btn-limpiar" onClick={limpiarFiltros}>
                Limpiar
              </button>
            </div>

            {/* Búsqueda */}
            <div className="filtro-grupo">
              <label className="filtro-label">Buscar curso</label>
              <div className="search-input">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Nombre, docente, tecnología..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  aria-label="Buscar cursos"
                />
              </div>
            </div>

            {/* Categorías */}
            <div className="filtro-grupo">
              <label className="filtro-label">Categoría</label>
              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="filtro-select"
                aria-label="Filtrar por categoría"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Modalidad */}
            <div className="filtro-grupo">
              <label className="filtro-label">Modalidad</label>
              <select
                value={modalidadFiltro}
                onChange={(e) => setModalidadFiltro(e.target.value)}
                className="filtro-select"
                aria-label="Filtrar por modalidad"
              >
                {modalidades.map(mod => (
                  <option key={mod} value={mod}>{mod}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="catalogo-main">
          {/* Toolbar */}
          <div className="catalogo-toolbar">
            <p className="resultado-info">
              Mostrando <strong>{cursosMostrados.length} cursos</strong>
            </p>
            <div className="toolbar-sort">
              <label htmlFor="sort" className="sort-label">Ordenar por:</label>
              <select
                id="sort"
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="sort-select"
                aria-label="Ordenar cursos"
              >
                <option value="popular">Más populares</option>
                <option value="mejor-calificados">Mejor valorados</option>
                <option value="mas-recientes">Más recientes</option>
                <option value="precio-menor">Precio: Menor a Mayor</option>
                <option value="precio-mayor">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Grid de cursos */}
          <div className="cursos-grid">
            {cursosMostrados.length > 0 ? (
              cursosMostrados.map(curso => (
                <TarjetaCurso key={curso.id} cursoId={curso.id} variante="catalogo" />
              ))
            ) : (
              <div className="sin-resultados">
                <p>📭 No se encontraron cursos que coincidan con los filtros.</p>
                <p>Intenta ajustar tu búsqueda o filtros.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}