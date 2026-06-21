import { Routes, Route } from "react-router-dom";
import { CursosProvider } from "./context/CursosContext";
import CursosDelEstudiante from "./pages/CursosDelEstudiante";
import CatalogoCursos from "./pages/CatalogoCursos";
import Usuario from "./components/Usuario";
import Navbar from "./components/Navbar";
import './App.css';

export default function App() {
  return (
    <CursosProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<CursosDelEstudiante />} />
        <Route path="/catalogocursos" element={<CatalogoCursos />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </CursosProvider>
  );
}
