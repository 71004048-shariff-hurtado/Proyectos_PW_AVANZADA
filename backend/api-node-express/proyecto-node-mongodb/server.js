const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const conectarDB = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');

const app = express();

// ── Seguridad ──────────────────────────────────────────
app.use(helmet());

// CORS: permite solicitudes desde los frontends locales y desplegados
const allowedOrigins = [
  'http://localhost:5173',  // React (Vite)
  'http://localhost:4200',  // Angular
  'http://localhost:3001',  // api-cursos
  process.env.FRONTEND_URL_REACT || '',
  process.env.FRONTEND_URL_ANGULAR || '',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Permitir también peticiones sin origin (ej. Postman, Thunder Client)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

// ── Rutas ──────────────────────────────────────────────
async function iniciarServidor() {
  await conectarDB();

  app.use('/api', usuarioRoutes);
  app.use('/api', inscripcionRoutes);

  // Ruta de salud (health check para Render)
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', servicio: 'auth-usuarios-inscripciones', timestamp: new Date() });
  });

  // Manejo global de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor.' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Servidor Auth/Usuarios corriendo en puerto ${PORT}`);
  });
}

iniciarServidor();