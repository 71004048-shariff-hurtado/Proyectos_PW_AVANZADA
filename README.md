# 🎓 EduTech — Plataforma de Gestión de Cursos e Inscripciones

> Proyecto final del curso de Programación Web Avanzada (PW2)

---

## 👥 Integrantes del equipo

| Nombre | Participación |
|--------|---------------|
| AARON SHARIFF HURTADO SANTAMARIA | 100% |
| SERGIO QUISPILLOCLLA CASIQUE | 100% |
| VICTOR CHAVEZ AGUILAR | 100% |

---

## 🎥 Video de sustentación

> 🎥 **YouTube**: [Enlace al video de sustentación] *(pendiente)*

---

## 📋 Descripción

EduTech es una plataforma web moderna que permite la gestión integral de cursos académicos. Estudiantes pueden explorar e inscribirse en cursos, administradores gestionan el catálogo completo, y docentes son registrados en el sistema por el equipo técnico.

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTENDS                                │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Angular 19    │  │    React (Vite) │  │    Next.js 15   │  │
│  │  Panel Admin +  │  │ Portal Estudiante│  │ Catálogo Público│  │
│  │  Vista Alumno   │  │  (React SPA)    │  │  (SSR / SSG)    │  │
│  │  :4200          │  │  :5173          │  │  :3002          │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼───────────────────┼───────────────────┼─────────────┘
            │                   │                   │
┌───────────▼───────────────────▼───────────────────▼─────────────┐
│                        BACKENDS (REST API)                        │
│                                                                   │
│  ┌─────────────────────────────┐  ┌──────────────────────────┐   │
│  │  Auth / Usuarios / Inscrip. │  │  Cursos / Docentes       │   │
│  │  Node.js + Express          │  │  Node.js + Express       │   │
│  │  Puerto: 3000               │  │  Puerto: 3001            │   │
│  └─────────────┬───────────────┘  └────────────┬─────────────┘   │
└────────────────┼────────────────────────────────┼─────────────────┘
                 └──────────────┬─────────────────┘
                                ▼
                  ┌─────────────────────────┐
                  │      MongoDB Local      │
                  │  localhost:27017        │
                  │  BD: database_proyecto_ │
                  │       final            │
                  └─────────────────────────┘
```

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-----------|
| Panel Admin + Vista Alumno | Angular 19, TypeScript, Reactive Forms |
| Portal Estudiante | React 18, Vite, Context API, React Router |
| Catálogo Público | Next.js 15, App Router, SSR/SSG (ISR) |
| Backend Auth/Inscripciones | Node.js, Express 5, JWT, bcrypt |
| Backend Cursos/Docentes | Node.js, Express 5, JWT (verificación) |
| Base de Datos | MongoDB (local: `localhost:27017`) |
| Seguridad | Helmet, CORS restringido, JWT, bcrypt |

---

## 🚀 Instalación y ejecución — Paso a paso


> ⚠️ **Requisito previo:** Tener **MongoDB corriendo** en `localhost:27017` antes de iniciar cualquier backend.
> Puedes usar **MongoDB Compass** o el servicio `mongod` desde la terminal.

### PASO 1 — Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyectos_PW_AVANZADA
```

---

### PASO 2 — Configurar las variables de entorno

Cada backend tiene su propio `.env`. Copia los ejemplos:

```bash
# Backend Auth (puerto 3000)
cd backend/api-node-express/proyecto-node-mongodb
cp .env.example .env

# Backend Cursos (puerto 3001)
cd ../api-cursos
cp .env.example .env
```

Los `.env` ya vienen configurados para MongoDB local. Solo necesitas asegurarte de que los valores sean:

**`backend/api-node-express/proyecto-node-mongodb/.env`**
```
MONGO_URI=mongodb://localhost:27017/database_proyecto_final
PORT=3000
JWT_SECRET=proyecto_final_pw2_clave_secreta_desarrollo_2024
```

**`backend/api-node-express/api-cursos/.env`**
```
MONGO_URI=mongodb://localhost:27017/proyecto-sistema
PORT=3001
JWT_SECRET=proyecto_final_pw2_clave_secreta_desarrollo_2024
```

---

### PASO 3 — Instalar dependencias de los backends

```bash
# Backend Auth
cd backend/api-node-express/proyecto-node-mongodb
npm install

# Backend Cursos
cd ../api-cursos
npm install
```

---

### PASO 4 — Crear usuarios de prueba (SEED)

> ⚠️ **Este paso requiere que MongoDB esté corriendo.**

```bash
cd backend/api-node-express/proyecto-node-mongodb
node scripts/seed-usuarios.js
```

Este script crea automáticamente los 3 usuarios de prueba con contraseñas hasheadas (bcrypt).
Si alguno ya existe, lo omite sin error. Es seguro ejecutarlo múltiples veces.

---

### PASO 5 — Iniciar los backends

Abre **2 terminales** y ejecuta cada una:

```bash
# Terminal 1 — Backend Auth/Inscripciones (puerto 3000)
cd backend/api-node-express/proyecto-node-mongodb
node server.js
# Debe mostrar: ✅ Conectado a MongoDB | Servidor en puerto 3000

# Terminal 2 — Backend Cursos/Docentes (puerto 3001)
cd backend/api-node-express/api-cursos
node server.js
# Debe mostrar: Conectado a MongoDB | Servidor en puerto 3001
```

---

### PASO 6 — Instalar dependencias de los frontends

```bash
# Angular
cd apps/admin-angular/admin-angular
npm install

# React
cd ../../portal-react/react-spa-proyectoFinal
npm install

# Next.js (opcional)
cd ../../mi-proyecto-next
npm install
```

---

### PASO 7 — Iniciar los frontends

Abre **2 terminales adicionales** (o 3 si quieres Next.js también):

```bash
# Terminal 3 — Portal React - Estudiante (puerto 5173)
cd apps/portal-react/react-spa-proyectoFinal
npm run dev

# Terminal 4 — Panel Angular - Admin + Alumno (puerto 4200)
cd apps/admin-angular/admin-angular
npx ng serve

# Terminal 5 (opcional) — Catálogo Next.js (puerto 3002)
cd apps/mi-proyecto-next
npm run dev -- -p 3002
```

---

### PASO 8 — Verificar que todo está corriendo

| Servicio | URL | Estado esperado |
|---------|-----|----------------|
| Backend Auth | `http://localhost:3000/health` | `{ "status": "ok" }` |
| Backend Cursos | `http://localhost:3001/api/cursos` | Lista de cursos JSON |
| Portal React | `http://localhost:5173` | Página de inicio/login |
| Panel Angular | `http://localhost:4200` | Página de inicio |
| Catálogo Next.js | `http://localhost:3002/cursos` | Catálogo público |

---

## 🔑 Credenciales de prueba

> Estas credenciales son creadas por el script `seed-usuarios.js` del Paso 4.

---

### 🛡️ Administrador

| Campo | Valor |
|-------|-------|
| **Email** | `admin_prueba@edutech.pe` |
| **Contraseña** | `Admin123!` |
| **Portal** | Angular → `http://localhost:4200/login` |
| **Redirige a** | `/admin-dashboard` |

**Vistas disponibles como Admin:**
- 📊 `/admin-dashboard` — Panel de control con estadísticas generales
- 👥 `/admin-estudiantes` — Ver, buscar y eliminar estudiantes registrados
- 👩‍🏫 `/admin-docentes` — Gestión del listado de docentes
- 📚 `/admin-cursos` — **CRUD completo** de cursos (crear, editar, eliminar)

> También puedes ingresar con el admin real: `admin_321@hotmail.com` / `qTg_!32$Wr`  
> *(Requiere que hayas ejecutado `node scripts/migrar-passwords.js` para hashear su contraseña)*

---

### 👨‍🎓 Estudiante

| Campo | Valor |
|-------|-------|
| **Email** | `estudiante@edutech.pe` |
| **Contraseña** | `Estudiante123!` |
| **Portal Angular** | `http://localhost:4200/login` |
| **Portal React** | `http://localhost:5173/login` |
| **Redirige a** | `/dashboard-estudiante` (Angular) ó `/` (React) |

**Vistas disponibles como Estudiante en Angular:**
- 🏠 `/dashboard-estudiante` — Resumen de cursos inscritos y progreso
- 📋 `/mis-inscripciones` — Lista completa de inscripciones con estado
- 🔍 `/explorar-cursos` — Catálogo de cursos disponibles + botón inscribirse
- 👤 `/perfil` — Datos del perfil del estudiante

**Vistas disponibles como Estudiante en React:**
- `/` — Mis inscripciones (redirige al login si no hay sesión)
- `/catalogocursos` — Catálogo de cursos
- `/usuario` — Perfil del estudiante

---

### 👩‍🏫 Docente

| Campo | Valor |
|-------|-------|
| **Email** | `docente@edutech.pe` |
| **Contraseña** | `Docente123!` |
| **Ver en** | MongoDB Compass → colección `usuario_docente` |
| **Ver en** | Angular → `/admin-docentes` (como admin) |

> El docente es gestionado por el administrador. Sus datos se ven en la sección de **Admin → Docentes**.
> No tiene login propio al portal (el sistema actual contempla Admin y Estudiante como roles de sesión).

---

## 🌐 Flujo completo demostrable

```
[1] Registrarse (o usar credenciales de prueba)
    └─→ http://localhost:4200/registro  ó  http://localhost:5173/registro

[2] Iniciar sesión como Estudiante
    └─→ http://localhost:4200/login  →  dashboard-estudiante

[3] Explorar catálogo de cursos
    └─→ http://localhost:4200/explorar-cursos

[4] Inscribirse en un curso
    └─→ Click "Inscribirme" en cualquier curso del catálogo

[5] Ver mis inscripciones
    └─→ http://localhost:4200/mis-inscripciones

[6] (Cerrar sesión y) Iniciar sesión como Admin
    └─→ http://localhost:4200/login  →  admin-dashboard

[7] Gestionar cursos (CRUD)
    └─→ http://localhost:4200/admin-cursos

[8] Ver estudiantes inscritos
    └─→ http://localhost:4200/admin-estudiantes

[9] Ver catálogo público (sin login)
    └─→ http://localhost:3002/cursos  (Next.js - SSG/ISR)
```

---

## 📡 Endpoints principales de la API

### Auth / Usuarios — Puerto 3000

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| `POST` | `/api/login` | ❌ | Iniciar sesión |
| `POST` | `/api/registro` | ❌ | Registrar estudiante |
| `GET` | `/api/usuarios` | ✅ Admin | Listar estudiantes |
| `DELETE` | `/api/usuarios/:id` | ✅ Admin | Eliminar usuario |
| `POST` | `/api/inscripciones` | ✅ | Inscribirse a un curso |
| `GET` | `/api/inscripciones/estudiante/:id` | ✅ | Mis inscripciones |
| `DELETE` | `/api/inscripciones/:id` | ✅ | Cancelar inscripción |

### Cursos / Docentes — Puerto 3001

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| `GET` | `/api/cursos` | ❌ | Listar todos los cursos |
| `POST` | `/api/cursos` | ✅ Admin | Crear curso |
| `PUT` | `/api/cursos/:id` | ✅ Admin | Actualizar curso |
| `DELETE` | `/api/cursos/:id` | ✅ Admin | Eliminar curso |
| `GET` | `/api/docentes` | ❌ | Listar docentes |

---

## 🔒 Seguridad implementada

| Control | Estado |
|---------|--------|
| Contraseñas hasheadas con **bcrypt** (salt 10) | ✅ |
| Autenticación con **JWT** (expira en 8h) | ✅ |
| Protección de rutas por **rol** (admin/student) | ✅ |
| **CORS** restringido a orígenes autorizados | ✅ |
| **Helmet** (headers HTTP de seguridad) | ✅ |
| Variables de entorno en `.env` (nunca en el código) | ✅ |
| `.env` excluido del repositorio (`.gitignore`) | ✅ |



## 📁 Estructura del repositorio

```
Proyectos_PW_AVANZADA/
├── README.md                    ← Este archivo
├── .env.example                 ← Plantilla de variables de entorno
├── .gitignore
├── docs/
│   ├── 03-modelo-de-datos.md
│   ├── 04-api-endpoints.md
│   └── 05-checklist-seguridad.md
├── apps/
│   ├── admin-angular/           ← Panel Admin + Vista Alumno (Angular 19)
│   ├── portal-react/            ← Portal del Estudiante (React + Vite)
│   └── mi-proyecto-next/        ← Catálogo Público (Next.js 15)
└── backend/
    └── api-node-express/
        ├── proyecto-node-mongodb/  ← Auth + Usuarios + Inscripciones (3000)
        │   └── scripts/
        │       ├── seed-usuarios.js      ← ⭐ Crear usuarios de prueba
        │       └── migrar-passwords.js   ← Hashear passwords existentes
        └── api-cursos/             ← Cursos + Docentes (3001)
```

---

## ❓ Problemas comunes

| Problema | Solución |
|----------|----------|
| `connect ECONNREFUSED 127.0.0.1:27017` | Iniciar MongoDB (`mongod` o abrir Compass) |
| `Error: JWT_SECRET not defined` | Verificar que el `.env` existe y tiene `JWT_SECRET` |
| `Cannot read properties of undefined` | Ejecutar el seed: `node scripts/seed-usuarios.js` |
| Puerto 4200 en uso | Cambiar: `npx ng serve --port 4201` |
| Puerto 5173 en uso | Cambiar en `vite.config.js` o usar `npm run dev -- --port 5174` |
| Angular no compila | Ejecutar `npm install` en la carpeta de Angular primero |
