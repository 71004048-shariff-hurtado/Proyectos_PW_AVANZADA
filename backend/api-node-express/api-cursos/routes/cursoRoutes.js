const express = require('express');
const router = express.Router();
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

const {
    crear,
    listar,
    actualizar,
    eliminar
} = require('../controllers/cursoController');

// GET es público (catálogo accesible sin login)
router.get('/cursos', listar);

// Operaciones de escritura solo para admin autenticado
router.post('/cursos', verificarToken, soloAdmin, crear);
router.put('/cursos/:id', verificarToken, soloAdmin, actualizar);
router.delete('/cursos/:id', verificarToken, soloAdmin, eliminar);

module.exports = router;