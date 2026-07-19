# 04 — Endpoints de la API

## Backend Auth / Usuarios / Inscripciones — Puerto 3000

Base URL local: `http://localhost:3000/api`

---

### Autenticación

| Método | Ruta | Auth | Body | Respuesta |
|--------|------|------|------|-----------|
| `POST` | `/login` | ❌ | `{ email, password }` | `{ token, role, user }` |
| `POST` | `/registro` | ❌ | `{ nombre, apellidos, correo_electronico, programa_academico, contraseña }` | `{ msg, user }` |

**Ejemplo login:**
```json
POST /api/login
{
  "email": "admin@edutech.com",
  "password": "admin123"
}

Respuesta 200:
{
  "msg": "Login correcto",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "admin",
  "user": { "id": "...", "correo_electronico": "admin@edutech.com", "nombre": "Administrador" }
}
```

---

### Usuarios (solo Admin)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| `GET` | `/usuarios` | ✅ Admin | Listar todos los estudiantes |
| `POST` | `/usuarios` | ✅ Admin | Crear usuario |
| `PUT` | `/usuarios/:id` | ✅ Admin | Actualizar usuario |
| `DELETE` | `/usuarios/:id` | ✅ Admin | Eliminar usuario |

---

### Inscripciones

| Método | Ruta | Auth | Body / Params | Descripción |
|--------|------|------|---------------|-------------|
| `POST` | `/inscripciones` | ✅ | `{ estudianteId, cursoId, nombreCurso, docente }` | Inscribirse a un curso |
| `GET` | `/inscripciones/estudiante/:id` | ✅ | - | Ver mis inscripciones |
| `PUT` | `/inscripciones/:id/progreso` | ✅ | `{ progreso, estado }` | Actualizar progreso |
| `DELETE` | `/inscripciones/:id` | ✅ | - | Cancelar inscripción |
| `GET` | `/inscripciones` | ✅ Admin | - | Ver todas las inscripciones |

**Ejemplo inscribirse:**
```json
POST /api/inscripciones
Headers: Authorization: Bearer <token>
{
  "estudianteId": "64f8a1...",
  "cursoId": "65a2b3...",
  "nombreCurso": "Desarrollo Frontend con React",
  "docente": "María Torres"
}

Respuesta 201:
{
  "_id": "...",
  "estudianteId": "...",
  "cursoId": "...",
  "nombreCurso": "Desarrollo Frontend con React",
  "progreso": 0,
  "estado": "progreso",
  "fechaInscripcion": "2024-01-15T..."
}
```

---

## Backend Cursos / Docentes — Puerto 3001

Base URL local: `http://localhost:3001/api`

---

### Cursos

| Método | Ruta | Auth | Body | Descripción |
|--------|------|------|------|-------------|
| `GET` | `/cursos` | ❌ | - | Listar todos los cursos (público) |
| `POST` | `/cursos` | ✅ Admin | `{ titulo, docente, categoria, horas, modalidad, precio, descripcion, estado }` | Crear curso |
| `PUT` | `/cursos/:id` | ✅ Admin | Campos a actualizar | Actualizar curso |
| `DELETE` | `/cursos/:id` | ✅ Admin | - | Eliminar curso |

**Ejemplo crear curso:**
```json
POST /api/cursos
Headers: Authorization: Bearer <token_admin>
{
  "titulo": "Desarrollo Web con React",
  "docente": "María Torres",
  "categoria": "Frontend",
  "horas": 60,
  "modalidad": "Virtual",
  "precio": 180,
  "descripcion": "Aprende React desde cero hasta nivel avanzado.",
  "estado": "Activo"
}
```

---

### Docentes

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| `GET` | `/docentes` | ❌ | Listar docentes |
| `POST` | `/docentes` | ✅ Admin | Crear docente |
| `PUT` | `/docentes/:id` | ✅ Admin | Actualizar docente |
| `DELETE` | `/docentes/:id` | ✅ Admin | Eliminar docente |

---

## Autenticación

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <jwt_token>
```

El token se obtiene del endpoint `/api/login` y expira en **8 horas**.

---

## Códigos HTTP utilizados

| Código | Significado |
|--------|-------------|
| `200` | Éxito |
| `201` | Recurso creado |
| `400` | Error de validación / datos inválidos |
| `401` | No autenticado (sin token) |
| `403` | No autorizado (rol insuficiente) |
| `404` | Recurso no encontrado |
| `409` | Conflicto (ej: inscripción duplicada) |
| `500` | Error interno del servidor |
