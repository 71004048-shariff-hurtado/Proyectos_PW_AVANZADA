import React, { lazy, Suspense, useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Lazy loading de las vistas
const PaginaInicio = lazy(() => import("./paginas/PaginaInicio"));
const CatalogoCursos = lazy(() => import("./paginas/CatalogoCursos"));
const DetalleCurso = lazy(() => import("./paginas/DetalleCurso"));
const Login = lazy(() => import("./paginas/Login"));
const Registro = lazy(() => import("./paginas/Registro"));
const DashboardEstudiante = lazy(() => import("./paginas/DashboardEstudiante"));
const MisInscripciones = lazy(() => import("./paginas/MisInscripciones"));
const Perfil = lazy(() => import("./paginas/Perfil"));
const AdminDashboard = lazy(() => import("./paginas/AdminDashboard"));
const AdminCursos = lazy(() => import("./paginas/AdminCursos"));
const AdminDocentes = lazy(() => import("./paginas/AdminDocentes"));
const AdminEstudiantes = lazy(() => import("./paginas/AdminEstudiantes"));

function AppContent() {
  const { vista, role } = useContext(AppContext);

  // Selector de página activa
  const renderPagina = () => {
    switch (vista) {
      case "inicio":
        return <PaginaInicio />;
      case "cursos":
        return <CatalogoCursos />;
      case "detalle-curso":
        return <DetalleCurso />;
      case "login":
        return <Login />;
      case "registro":
        return <Registro />;
      case "dashboard":
        return role === "admin" ? <AdminDashboard /> : <DashboardEstudiante />;
      case "mis-inscripciones":
        return <MisInscripciones />;
      case "perfil":
        return <Perfil />;
      case "admin-cursos":
        return <AdminCursos />;
      case "admin-docentes":
        return <AdminDocentes />;
      case "admin-estudiantes":
        return <AdminEstudiantes />;
      default:
        return <PaginaInicio />;
    }
  };

  // Determinar si la página activa es un panel de control con barra lateral (Dashboard, Perfil, etc.)
  const esPanelConSidebar = 
    (role === "student" && ["dashboard", "mis-inscripciones", "perfil"].includes(vista)) ||
    (role === "admin" && ["dashboard", "admin-cursos", "admin-docentes", "admin-estudiantes"].includes(vista));

  if (esPanelConSidebar) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="page-content" style={{ flex: 1, padding: 0 }}>
          <div className="layout-with-sidebar">
            <Sidebar />
            <main className="main-content">
              <Suspense fallback={
                <div style={{ padding: "var(--space-12)", textAlign: "center", color: "var(--text-secondary)" }}>
                  <p style={{ fontSize: "var(--text-lg)" }}>Cargando panel...</p>
                </div>
              }>
                {renderPagina()}
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Layout público normal (sin sidebar, incluye pie de página)
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Suspense fallback={
          <div style={{ padding: "var(--space-12)", textAlign: "center", color: "var(--text-secondary)" }}>
            <p style={{ fontSize: "var(--text-lg)" }}>Cargando contenido...</p>
          </div>
        }>
          {renderPagina()}
        </Suspense>
      </div>
      {/* Omitir footer en las pantallas de login/registro para asemejarse a los prototipos */}
      {!["login", "registro"].includes(vista) && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}