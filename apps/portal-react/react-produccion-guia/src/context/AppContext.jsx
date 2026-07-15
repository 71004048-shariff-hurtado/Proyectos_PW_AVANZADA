import React, { createContext, useState, useEffect } from "react";
import { logger } from "../utils/logger";

export const AppContext = createContext();

const initialCourses = [
  {
    id: 1,
    title: "Programación Web II",
    category: "Frontend",
    instructor: "Juan Pérez",
    rating: 4.8,
    hours: 40,
    modality: "Virtual",
    studentsCount: 320,
    price: 120,
    badgeClass: "badge-primary",
    icon: "⚛️",
    description: "Aprende el desarrollo de aplicaciones web interactivas utilizando HTML5, CSS3 avanzados y JavaScript modular."
  },
  {
    id: 2,
    title: "Desarrollo Frontend con React",
    category: "Full Stack",
    instructor: "María Torres",
    rating: 4.9,
    hours: 60,
    modality: "Híbrida",
    studentsCount: 510,
    price: 180,
    badgeClass: "badge-accent",
    icon: "⚡",
    description: "Aprende a construir interfaces modernas y escalables usando React, hooks, context API, y arquitectura frontend lista para producción."
  },
  {
    id: 3,
    title: "Backend con Node.js",
    category: "Backend",
    instructor: "Luis Ramírez",
    rating: 4.7,
    hours: 55,
    modality: "Virtual",
    studentsCount: 280,
    price: 150,
    badgeClass: "badge-success",
    icon: "🚀",
    description: "Domina la creación de APIs REST robustas y escalables con Node.js, Express, middleware y seguridad."
  },
  {
    id: 4,
    title: "Seguridad en Aplicaciones Web",
    category: "Seguridad",
    instructor: "Juan Pérez",
    rating: 4.9,
    hours: 35,
    modality: "Híbrida",
    studentsCount: 190,
    price: 200,
    badgeClass: "badge-warning",
    icon: "🔐",
    description: "Identifica y mitiga las principales vulnerabilidades OWASP Top 10 en aplicaciones web mediante hacking ético."
  },
  {
    id: 5,
    title: "Bases de Datos NoSQL",
    category: "Base de Datos",
    instructor: "María Torres",
    rating: 4.6,
    hours: 30,
    modality: "Virtual",
    studentsCount: 145,
    price: 0, // Gratuito
    badgeClass: "badge-primary",
    icon: "🗃️",
    description: "Aprende el modelado y consulta de datos no relacionales usando MongoDB, agregaciones y escalabilidad."
  },
  {
    id: 6,
    title: "DevOps y CI/CD con GitHub Actions",
    category: "DevOps",
    instructor: "Luis Ramírez",
    rating: 4.8,
    hours: 45,
    modality: "Virtual",
    studentsCount: 220,
    price: 160,
    badgeClass: "badge-gray",
    icon: "🔧",
    description: "Automatiza flujos de integración y despliegue continuo (CI/CD) para desplegar aplicaciones con seguridad."
  }
];

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest"); // guest, student, admin
  const [vista, setVista] = useState("inicio"); // inicio, cursos, login, registro, dashboard, etc.
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Inicializar inscripciones iniciales para el estudiante de demostración
  const [enrollments, setEnrollments] = useState([
    { courseId: 2, progress: 72, grade: null },
    { courseId: 3, progress: 38, grade: null },
    { courseId: 1, progress: 100, grade: 18 } // Completado con nota 18
  ]);

  // Manejar el login simulado
  const login = (email, password) => {
    logger.info("Intentando iniciar sesión", { email });
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === "admin@edutech.pe" || cleanEmail === "admin@correo.edu.pe") {
      setUser({
        name: "Administrador",
        email: cleanEmail,
        role: "admin"
      });
      setRole("admin");
      setVista("dashboard");
      logger.info("Login exitoso como administrador");
      return true;
    } else if (cleanEmail === "estudiante@edutech.pe" || cleanEmail === "estudiante@correo.edu.pe" || cleanEmail === "carlos@correo.edu.pe") {
      setUser({
        name: "Carlos García",
        email: cleanEmail,
        role: "student",
        carrera: "Ingeniería de Sistemas",
        avatar: "CG"
      });
      setRole("student");
      setVista("dashboard");
      logger.info("Login exitoso como estudiante");
      return true;
    }
    
    // Si no coincide con las cuentas demo, creamos un estudiante genérico
    setUser({
      name: email.split("@")[0],
      email: cleanEmail,
      role: "student",
      carrera: "Ingeniería de Software",
      avatar: email.substring(0, 2).toUpperCase()
    });
    setRole("student");
    setVista("dashboard");
    logger.info("Login exitoso (nuevo estudiante)");
    return true;
  };

  const logout = () => {
    logger.info("Cerrando sesión");
    setUser(null);
    setRole("guest");
    setVista("inicio");
    setSelectedCourseId(null);
  };

  const registrarUsuario = (userData) => {
    logger.info("Registrando usuario", userData);
    setUser({
      name: userData.nombre,
      email: userData.email,
      role: "student",
      carrera: userData.carrera || "Ingeniería de Sistemas",
      avatar: userData.nombre.substring(0, 2).toUpperCase()
    });
    setRole("student");
    setVista("dashboard");
    return true;
  };

  const inscribirseCurso = (courseId) => {
    if (role !== "student") {
      logger.warn("Se requiere sesión de estudiante para inscribirse");
      setVista("login");
      return;
    }
    
    const yaInscrito = enrollments.some(e => e.courseId === courseId);
    if (yaInscrito) {
      logger.info("El estudiante ya está inscrito en el curso", { courseId });
      setVista("dashboard");
      return;
    }

    setEnrollments([...enrollments, { courseId, progress: 0, grade: null }]);
    logger.info("Inscripción exitosa en curso", { courseId });
    setVista("dashboard");
  };

  return (
    <AppContext.Provider
      value={{
        courses,
        setCourses,
        user,
        setUser,
        role,
        setRole,
        vista,
        setVista,
        selectedCourseId,
        setSelectedCourseId,
        enrollments,
        setEnrollments,
        login,
        logout,
        registrarUsuario,
        inscribirseCurso
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
