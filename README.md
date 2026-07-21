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

EduTech es una plataforma web moderna que permite la gestión integral de cursos académicos. Estudiantes pueden explorar e inscribirse en cursos, administradores gestionan el catálogo completo, y docentes son registrados en el sistema.

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
                  └─────────────────────────┘
```

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-----------|
| Panel Admin + Vista Alumno | Angular 19, TypeScript, Reactive Forms |
| Portal Estudiante | React 18, Vite, Context API, React Router |
| Catálogo Público | Next.js 15, App Router, SSR/SSG (ISR) |
| Backend Auth/Inscripciones | Node.js, Express, JWT, bcrypt |
| Backend Cursos/Docentes | Node.js, Express, JWT (verificación) |
| Base de Datos | MongoDB (local: `localhost:27017`) |
| Seguridad | Helmet, CORS restringido, JWT, bcrypt |

---

## 🚀 Guía de instalación y ejecución

> **Lee esto completo antes de empezar.** Saltarse algún paso es la causa más común de errores.

---

### ✅ Requisitos previos

Asegúrate de tener instalado lo siguiente **antes de comenzar**:

| Herramienta | Versión mínima | Verificar con |
|-------------|---------------|---------------|
| Node.js | 18 o superior | `node -v` |
| npm | 9 o superior | `npm -v` |
| MongoDB Community | 6 o superior | Abrir MongoDB Compass |
| Angular CLI | 17 o superior | `npx ng version` |
| Git | cualquiera | `git --version` |

---

### PASO 1 — Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyectos_PW_AVANZADA
```

---

### PASO 2 — Iniciar MongoDB

> ⚠️ **CRÍTICO:** MongoDB debe estar corriendo **antes** de ejecutar cualquier backend o el seed. Sin esto, los servidores se caen al instante.

**Opción A — Con MongoDB Compass (recomendado):**
1. Abre MongoDB Compass
2. Conéctate a `mongodb://localhost:27017`
3. Deja Compass abierto mientras trabajas

**Opción B — Con el servicio de Windows:**
```powershell
# Iniciar MongoDB como servicio (ejecutar como Administrador)
net start MongoDB
```

**Opción C — Desde la terminal:**
```bash
mongod --dbpath "C:/data/db"
```

✅ Sabrás que funciona cuando puedas abrir `mongodb://localhost:27017` en Compass sin error.

---

### PASO 3 — Configurar variables de entorno (.env)

Los `.env` ya existen en el proyecto con los valores correctos para local. Solo verifica que estén así:

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

> Si no existen los `.env`, cópialos desde los `.env.example`:
> ```bash
> cp backend/api-node-express/proyecto-node-mongodb/.env.example backend/api-node-express/proyecto-node-mongodb/.env
> cp backend/api-node-express/api-cursos/.env.example backend/api-node-express/api-cursos/.env
> ```

---

### PASO 4 — Instalar dependencias

Abre una terminal y ejecuta cada bloque **en orden**:

```bash
# Backend Auth (puerto 3000)
cd backend/api-node-express/proyecto-node-mongodb
npm install

# Backend Cursos (puerto 3001)
cd ../api-cursos
npm install

# Angular (panel admin + estudiante)
cd ../../apps/admin-angular/admin-angular
npm install

# React (portal estudiante)
cd ../../portal-react/react-spa-proyectoFinal
npm install

# Next.js (catálogo público) — opcional
cd ../../mi-proyecto-next
npm install
```

---

### PASO 5 — Crear usuarios de prueba (SEED) ⭐

> ⚠️ **OBLIGATORIO.** Sin este paso los usuarios estudiante y docente no existen en la BD y no podrás iniciar sesión con ellos.
>
> Este paso también migra la contraseña del admin real (`admin_321@hotmail.com`) a bcrypt si aún está en texto plano.

Con **MongoDB corriendo** (Paso 2), ejecuta:

```bash
cd backend/api-node-express/proyecto-node-mongodb
node scripts/seed-usuarios.js
```

Debes ver en la consola algo como:
```
✅ Conectado.
🔑 Verificando admin real... → contraseña migrada / ya hasheada
👨‍🎓 Procesando estudiante... → ✅ Creado
👩‍🏫 Procesando docente...    → ✅ Creado
🎉 Seed completado.
```

> Es seguro ejecutarlo múltiples veces. Si el usuario ya existe, lo omite.

---

### PASO 6 — Iniciar los backends

Abre **2 terminales separadas** y ejecuta una en cada una:

```bash
# ── TERMINAL 1 ── Backend Auth / Usuarios / Inscripciones (puerto 3000)
cd backend/api-node-express/proyecto-node-mongodb
node server.js
```
✅ Debe mostrar: `Servidor corriendo en el puerto 3000` y `Conectado a MongoDB`

```bash
# ── TERMINAL 2 ── Backend Cursos / Docentes (puerto 3001)
cd backend/api-node-express/api-cursos
node server.js
```
✅ Debe mostrar: `Servidor corriendo en el puerto 3001` y conexión exitosa a MongoDB

> ⚠️ Si ves `connect ECONNREFUSED 127.0.0.1:27017` → MongoDB no está corriendo. Vuelve al Paso 2.

---

### PASO 7 — Iniciar los frontends

Abre **2 terminales más** (o 3 si quieres Next.js también):

```bash
# ── TERMINAL 3 ── Portal React — Estudiante (puerto 5173)
cd apps/portal-react/react-spa-proyectoFinal
npm run dev
```
✅ Abre: `http://localhost:5173`

```bash
# ── TERMINAL 4 ── Panel Angular — Admin + Alumno (puerto 4200)
cd apps/admin-angular/admin-angular
npx ng serve
```
✅ Abre: `http://localhost:4200`
> La primera vez tarda ~1-2 minutos en compilar. Espera a ver `✔ Compiled successfully`.

```bash
# ── TERMINAL 5 (opcional) ── Catálogo Next.js (puerto 3002)
cd apps/mi-proyecto-next
npm run dev -- -p 3002
```
✅ Abre: `http://localhost:3002`

---

### PASO 8 — Verificar que todo funciona

Abre estas URLs en tu navegador y confirma que respondan:

| Servicio | URL | Respuesta esperada |
|---------|-----|--------------------|
| 🔧 Backend Auth | `http://localhost:3000/api/login` | Error de método (es POST) — significa que el servidor está vivo |
| 🔧 Backend Cursos | `http://localhost:3001/api/cursos` | Lista de cursos en JSON (puede ser `[]` si no hay cursos aún) |
| 🌐 Portal React | `http://localhost:5173/login` | Página de login de EduTech |
| 🌐 Panel Angular | `http://localhost:4200/login` | Página de login de EduTech |
| 🌐 Next.js | `http://localhost:3002` | Catálogo público de cursos |

---

## 🔑 Credenciales de acceso

> Todos los usuarios de prueba son creados en el **Paso 5 (Seed)**. Deben existir en la BD antes de intentar login.

---

### 🛡️ Administrador

| Campo | Valor |
|-------|-------|
| **Email** | `admin_321@hotmail.com` |
| **Contraseña** | `qTg_!32$Wr` |
| **Email alternativo** | `admin_prueba@edutech.pe` |
| **Contraseña alternativa** | `Admin123!` |
| **Portal** | Angular → `http://localhost:4200/login` |
| **Redirige a** | `/admin-dashboard` |

**Vistas disponibles:**
- 📊 `/admin-dashboard` — Estadísticas generales del sistema
- 📚 `/admin-cursos` — CRUD completo de cursos (crear, editar, eliminar)
- 👥 `/admin-estudiantes` — CRUD completo de estudiantes (con sincronización y contraseña por defecto: Estudiante123!)
- 👨‍🏫 `/admin-docentes` — CRUD completo de docentes (ahora sincronizado automáticamente entre BD de Cursos y BD de Auth, creando cuenta con contraseña: Docente123!)

---

### 👨‍🎓 Estudiante

| Campo | Valor |
|-------|-------|
| **Email** | `estudiante@edutech.pe` |
| **Contraseña** | `Estudiante123!` |
| **Portal Angular** | `http://localhost:4200/login` |
| **Portal React** | `http://localhost:5173/login` |
| **Redirige a** | `/dashboard-estudiante` |

**Vistas disponibles en Angular:**
- 🏠 `/dashboard-estudiante` — Cursos inscritos y progreso
- 🔍 `/explorar-cursos` — Catálogo con botón "Inscribirse"
- 📋 `/mis-inscripciones` — Todas mis inscripciones
- 👤 `/perfil` — Datos del perfil

**Vistas disponibles en React:**
- `/catalogocursos` — Catálogo de cursos
- `/usuario` — Perfil del estudiante

---

### 👩‍🏫 Docente

| Campo | Valor |
|-------|-------|
| **Email** | `docente@edutech.pe` |
| **Contraseña** | `Docente123!` |
| **Portal** | Angular → `http://localhost:4200/login` |
| **Redirige a** | `/dashboard-docente` |

**Vistas exclusivas del Docente:**
- 🏠 `/dashboard-docente` — Resumen estadístico (Cursos asignados, total de estudiantes).
- 📚 `/mis-cursos-docente` — Vista detallada de los cursos que imparte el profesor.
- 👥 `/mis-alumnos` — Tabla de estudiantes inscritos en sus cursos, mostrando progreso y estado.

> El administrador gestiona a los docentes desde su panel (`/admin-docentes`). Anteriormente el docente no podía iniciar sesión porque los sistemas estaban fragmentados, pero **gracias a la nueva sincronización de bases de datos**, cualquier docente o estudiante creado por el Administrador obtiene instantáneamente su cuenta para iniciar sesión (`Docente123!` o `Estudiante123!`).

---

## 🌐 Flujo completo demostrable

```
[1] Iniciar sesión como ESTUDIANTE
    URL: http://localhost:4200/login
    Email: estudiante@edutech.pe / Contraseña: Estudiante123!

[2] Explorar catálogo de cursos
    URL: http://localhost:4200/explorar-cursos

[3] Inscribirse en un curso
    → Click "Inscribirme" en cualquier curso

[4] Ver mis inscripciones
    URL: http://localhost:4200/mis-inscripciones

[5] Cerrar sesión → Iniciar como ADMIN
    URL: http://localhost:4200/login
    Email: admin_321@hotmail.com / Contraseña: qTg_!32$Wr

[6] Cerrar sesión e iniciar como DOCENTE
    URL: http://localhost:4200/login
    Email: docente@edutech.pe / Contraseña: Docente123!
    → Ver dashboard de docente, revisar cursos asignados y tabla de estudiantes.

[7] Cerrar sesión e iniciar como ADMIN
    URL: http://localhost:4200/login
    Email: admin_321@hotmail.com / Contraseña: qTg_!32$Wr

[8] Gestionar plataforma (CRUD completo)
    URL: http://localhost:4200/admin-cursos (Agregar/Editar cursos)
    URL: http://localhost:4200/admin-docentes (Agregar/Editar docentes)

[9] Ver catálogo público (sin login, Next.js)
    URL: http://localhost:3002
```

---

## 📡 Endpoints principales de la API

### Auth / Usuarios — Puerto 3000

| Método | Ruta | Auth requerido | Descripción |
|--------|------|----------------|-------------|
| `POST` | `/api/login` | ❌ | Iniciar sesión (admin, estudiante o docente) |
| `POST` | `/api/registro` | ❌ | Registrar nuevo estudiante |
| `GET` | `/api/usuarios` | ✅ Admin | Listar estudiantes |
| `DELETE` | `/api/usuarios/:id` | ✅ Admin | Eliminar usuario |
| `POST` | `/api/inscripciones` | ✅ Token | Inscribirse a un curso |
| `GET` | `/api/inscripciones/estudiante/:id` | ✅ Token | Ver mis inscripciones |
| `GET` | `/api/inscripciones/docente/:nombre`| ✅ Token | Ver estudiantes de un docente |
| `DELETE` | `/api/inscripciones/:id` | ✅ Token | Cancelar inscripción |

### Cursos / Docentes — Puerto 3001

| Método | Ruta | Auth requerido | Descripción |
|--------|------|----------------|-------------|
| `GET` | `/api/cursos` | ❌ | Listar todos los cursos |
| `GET` | `/api/cursos/docente/:nombre` | ✅ Token | Listar cursos que imparte un docente |
| `POST` | `/api/cursos` | ✅ Admin | Crear curso |
| `PUT` | `/api/cursos/:id` | ✅ Admin | Actualizar curso |
| `DELETE` | `/api/cursos/:id` | ✅ Admin | Eliminar curso |
| `GET` | `/api/docentes` | ❌ | Listar docentes |
| `POST` | `/api/docentes` | ✅ Admin | Crear docente |
| `PUT` | `/api/docentes/:id` | ✅ Admin | Actualizar docente |
| `DELETE` | `/api/docentes/:id` | ✅ Admin | Eliminar docente |

---

## 🔒 Seguridad implementada

| Control | Estado |
|---------|--------|
| Contraseñas hasheadas con **bcrypt** (salt 10) | ✅ |
| Autenticación con **JWT** (expira en 8h) | ✅ |
| Protección de rutas por **rol** (admin / student / docente) | ✅ |
| **CORS** restringido a orígenes autorizados | ✅ |
| **Helmet** (headers HTTP de seguridad) | ✅ |
| Variables de entorno en `.env` (nunca en el código) | ✅ |
| `.env` excluido del repositorio (`.gitignore`) | ✅ |

---

## 📁 Estructura del repositorio

```
Proyectos_PW_AVANZADA/
├── README.md
├── .gitignore
├── apps/
│   ├── admin-angular/admin-angular/     ← Angular (puerto 4200)
│   │   └── src/app/
│   │       ├── components/              ← login, admin-cursos, dashboard-estudiante, etc.
│   │       ├── services/                ← auth.service, curso, inscripcion
│   │       └── guard/                   ← auth-guard (protección de rutas por rol)
│   ├── portal-react/react-spa-proyectoFinal/  ← React + Vite (puerto 5173)
│   └── mi-proyecto-next/               ← Next.js (puerto 3002)
└── backend/
    └── api-node-express/
        ├── proyecto-node-mongodb/       ← Auth + Usuarios + Inscripciones (puerto 3000)
        │   ├── models/                  ← Administrador, UsuarioEstudiante, UsuarioDocente, Inscripcion
        │   ├── controllers/             ← usuarioController, inscripcionController
        │   ├── routes/                  ← usuarioRoutes, inscripcionRoutes
        │   └── scripts/
        │       └── seed-usuarios.js    ← ⭐ EJECUTAR ESTO (Paso 5)
        └── api-cursos/                  ← Cursos + Docentes (puerto 3001)
            ├── models/                  ← Curso (titulo, docente, categoria, horas, modalidad, precio...)
            ├── controllers/             ← cursoController
            └── routes/                  ← cursoRoutes (GET público / POST-PUT-DELETE solo admin)
```

---

## 🛑 Solución de Errores Comunes (Troubleshooting)

### Error: `Failed to resolve import "zone.js"` al compilar Angular
Si al ejecutar `npx ng serve` en la carpeta de Angular obtienes un error rojo indicando que no se pudo resolver el import de `zone.js` (`src/main.ts:1:7`), se debe a que la versión moderna de Angular intenta ser "zoneless" por defecto, pero nuestro proyecto requiere esta librería para evitar bugs gráficos de refresco.

**Solución:**
En la terminal de Angular, cancela la ejecución (`Ctrl + C`) y ejecuta:
```bash
npm install zone.js
npx ng serve
```
El servidor ahora compilará correctamente. (Este paso ya está cubierto si descargaste la versión más reciente del código, ya que ha sido incluido en las dependencias).

---

## ❓ Problemas comunes y soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `connect ECONNREFUSED 127.0.0.1:27017` | MongoDB no está corriendo | Abrir Compass o ejecutar `net start MongoDB` |
| `Error: JWT_SECRET not defined` | Falta el archivo `.env` | Copiar `.env.example` a `.env` en cada backend |
| Login devuelve "Credenciales inválidas" para estudiante/docente | El seed no se ejecutó | Correr `node scripts/seed-usuarios.js` (Paso 5) |
| Login devuelve 401 para admin real | La contraseña no está hasheada | Correr el seed (migra automáticamente) |
| Crear/editar curso devuelve 401 | El token no se envía en la petición | Actualizar el servicio Angular (ya corregido) |
| Crear curso devuelve error de validación | Modelo desactualizado | El modelo `Curso.js` ya fue corregido |
| Angular muestra pantalla en blanco | Error de compilación o `npm install` faltante | Ejecutar `npm install` en la carpeta de Angular |
| `Could not find '@angular/build:application'` | `node_modules` no instalados | Ejecutar `npm install` dentro de `admin-angular/` |
| Puerto 4200 en uso | Otro proceso lo ocupa | Usar `npx ng serve --port 4201` |
| Puerto 5173 en uso | Otro proceso lo ocupa | `npm run dev -- --port 5174` |
| El guard redirige al login infinitamente | Token expirado en localStorage | Cerrar sesión, borrar localStorage, volver a login |
