# 03 — Modelo de Datos

## Colecciones en MongoDB

---

### `usuario_estudiante`

Almacena los estudiantes registrados en la plataforma.

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Auto | Identificador único |
| `nombre` | String | ✅ | Nombre del estudiante |
| `apellidos` | String | ✅ | Apellidos |
| `correo_electronico` | String | ✅ | Email (único) |
| `programa_academico` | String | ❌ | Carrera o programa |
| `contraseña` | String | ✅ | Hash bcrypt |
| `createdAt` | Date | Auto | Timestamps |

---

### `administrador`

Usuarios con rol de administrador del sistema.

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Auto | Identificador único |
| `correo_electronico` | String | ✅ | Email (único) |
| `contraseña` | String | ✅ | Hash bcrypt |

---

### `inscripciones`

Relación entre estudiante y curso (inscripción).

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Auto | Identificador único |
| `estudianteId` | ObjectId (ref: UsuarioEstudiante) | ✅ | Referencia al estudiante |
| `cursoId` | String | ✅ | ID del curso en api-cursos |
| `nombreCurso` | String | ✅ | Nombre del curso (desnormalizado) |
| `docente` | String | ❌ | Nombre del docente |
| `progreso` | Number (0-100) | ❌ | Porcentaje de avance |
| `estado` | String (enum) | ❌ | `progreso` \| `completado` |
| `fechaInscripcion` | Date | Auto | Fecha de inscripción |

**Índice único**: `(estudianteId, cursoId)` — evita inscripciones duplicadas.

---

### `cursos` (en api-cursos, BD separada)

Catálogo de cursos de la plataforma.

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Auto | Identificador único |
| `titulo` | String | ✅ | Nombre del curso |
| `docente` | String | ✅ | Nombre del docente |
| `categorias` | String | ✅ | Categoría del curso |
| `inscritos` | String | ✅ | Número de inscritos |
| `precio` | String | ✅ | Precio del curso |
| `estado` | String | ✅ | Estado del curso |

---

### `docentes` (en api-cursos, BD separada)

Información de los docentes de la plataforma.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `_id` | ObjectId | Identificador único |
| Campos según modelo `Docente.js` | - | Ver `models/Docente.js` |

---

## Diagrama de relaciones

```
UsuarioEstudiante (1) ──── (N) Inscripcion (N) ──── (1) Curso
                                                           │
                                                     (en otra BD)
                                                           │
                                                     Docente
```

> Las colecciones `cursos` y `docentes` viven en la base de datos de `api-cursos`,
> mientras que `usuario_estudiante`, `administrador` e `inscripciones` están en la
> base de datos de `proyecto-node-mongodb`.
