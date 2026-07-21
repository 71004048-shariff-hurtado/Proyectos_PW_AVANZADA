/**
 * Utilidad centralizada para llamadas HTTP al backend.
 * Agrega automáticamente el token JWT del localStorage.
 */

const AUTH_API = 'https://edutech-api-auth.onrender.com/api';
const CURSOS_API = 'https://edutech-api-cursos.onrender.com/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const api = {
  // ── Auth / Usuarios (puerto 3000) ─────────────────────
  login: (email, password) =>
    fetch(`${AUTH_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  registro: (datos) =>
    fetch(`${AUTH_API}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    }).then(handleResponse),

  // ── Cursos (puerto 3001) ───────────────────────────────
  getCursos: () =>
    fetch(`${CURSOS_API}/cursos`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

  // ── Inscripciones (puerto 3000) ────────────────────────
  inscribirse: (estudianteId, cursoId, nombreCurso, docente) =>
    fetch(`${AUTH_API}/inscripciones`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ estudianteId, cursoId, nombreCurso, docente }),
    }).then(handleResponse),

  misInscripciones: (estudianteId) =>
    fetch(`${AUTH_API}/inscripciones/estudiante/${estudianteId}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

  cancelarInscripcion: (inscripcionId) =>
    fetch(`${AUTH_API}/inscripciones/${inscripcionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse),
};

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.error || 'Error en la solicitud');
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}
