// Datos mock de cursos disponibles
export const cursosMock = [
  {
    id: 1,
    nombre: "React Avanzado",
    docente: "Juan Pérez",
    descripcion: "Aprende React profundamente con Hooks, Context API y gestión de estado avanzada.",
    modalidad: "Virtual",
    duracion: 40,
    categoria: "Frontend",
    precio: 49.99,
    calificacion: 4.8,
    estudiantes: 245,
    imagen: "🎓"
  },
  {
    id: 2,
    nombre: "Node.js y Express",
    docente: "María Torres",
    descripcion: "Desarrolla aplicaciones backend escalables con Node.js y Express.js.",
    modalidad: "Presencial",
    duracion: 50,
    categoria: "Backend",
    precio: 59.99,
    calificacion: 4.7,
    estudiantes: 180,
    imagen: "🚀"
  },
  {
    id: 3,
    nombre: "MongoDB y Bases de Datos",
    docente: "Luis Ramírez",
    descripcion: "Domina MongoDB, diseño de esquemas y consultas avanzadas para tus aplicaciones.",
    modalidad: "Híbrida",
    duracion: 35,
    categoria: "Base de Datos",
    precio: 39.99,
    calificacion: 4.5,
    estudiantes: 156,
    imagen: "📊"
  },
  {
    id: 4,
    nombre: "Full Stack Development",
    docente: "Carlos Mendez",
    descripcion: "Conviértete en desarrollador Full Stack dominando Frontend y Backend.",
    modalidad: "Virtual",
    duracion: 80,
    categoria: "Full Stack",
    precio: 89.99,
    calificacion: 4.9,
    estudiantes: 420,
    imagen: "💻"
  },
  {
    id: 5,
    nombre: "Seguridad Web",
    docente: "Ana García",
    descripcion: "Aprende a proteger tus aplicaciones web de vulnerabilidades y ataques.",
    modalidad: "Presencial",
    duracion: 45,
    categoria: "Seguridad",
    precio: 69.99,
    calificacion: 4.6,
    estudiantes: 98,
    imagen: "🔒"
  },
  {
    id: 6,
    nombre: "Docker y DevOps",
    docente: "Roberto Silva",
    descripcion: "Domina contenedores Docker y prácticas de DevOps para deployment profesional.",
    modalidad: "Híbrida",
    duracion: 55,
    categoria: "DevOps",
    precio: 79.99,
    calificacion: 4.7,
    estudiantes: 134,
    imagen: "🐳"
  }
];

// Inscripciones mock del estudiante actual
export const inscripcionesMock = [
  {
    id: 101,
    cursoId: 1,
    nombreCurso: "React Avanzado",
    docente: "Juan Pérez",
    fechaInscripcion: "2024-01-15",
    modalidad: "Virtual",
    progreso: 65,
    estado: "En progreso"
  },
  {
    id: 102,
    cursoId: 4,
    nombreCurso: "Full Stack Development",
    docente: "Carlos Mendez",
    fechaInscripcion: "2024-02-01",
    modalidad: "Virtual",
    progreso: 30,
    estado: "En progreso"
  },
  {
    id: 103,
    cursoId: 3,
    nombreCurso: "MongoDB y Bases de Datos",
    docente: "Luis Ramírez",
    fechaInscripcion: "2023-11-20",
    modalidad: "Híbrida",
    progreso: 100,
    estado: "Completado"
  }
];