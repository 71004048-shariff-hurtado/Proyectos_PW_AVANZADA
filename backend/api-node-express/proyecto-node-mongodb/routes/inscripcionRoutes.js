const express = require('express');
const router = express.Router();
const {
  inscribirse,
  misInscripciones,
  inscripcionesPorDocente,
  listarTodas,
  actualizarProgreso,
  cancelar,
} = require('../controllers/inscripcionController');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Inscribir a un estudiante en un curso
router.post('/inscripciones', inscribirse);

// Ver mis inscripciones (el estudiante solo puede ver las suyas)
router.get('/inscripciones/estudiante/:estudianteId', misInscripciones);

// Ver inscripciones de un docente (el docente solo puede ver las suyas)
router.get('/inscripciones/docente/:nombre', inscripcionesPorDocente);

// Actualizar progreso de una inscripción
router.put('/inscripciones/:id/progreso', actualizarProgreso);

// Cancelar inscripción
router.delete('/inscripciones/:id', cancelar);

// Solo admin: ver todas las inscripciones
router.get('/inscripciones', soloAdmin, listarTodas);

module.exports = router;
