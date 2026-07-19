const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const conectarDB = require('./config/database');
const cursoRoutes = require('./routes/cursoRoutes');
const docenteRoutes = require('./routes/docenteRoutes');

const app = express();

// ── Seguridad ──────────────────────────────────────────
app.use(helmet());

// CORS: permite solicitudes desde los frontends locales y desplegados
const allowedOrigins = [
  'http://localhost:5173',  // React (Vite)
  'http://localhost:4200',  // Angular
  'http://localhost:3000',  // api principal
  process.env.FRONTEND_URL_REACT || '',
  process.env.FRONTEND_URL_ANGULAR || '',
  process.env.FRONTEND_URL_NEXT || '',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
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

  app.use('/api', cursoRoutes);
  app.use('/api', docenteRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', servicio: 'cursos-docentes', timestamp: new Date() });
  });

  // Manejo global de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor.' });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`✅ Servidor Cursos/Docentes corriendo en puerto ${PORT}`);
  });
}

iniciarServidor();