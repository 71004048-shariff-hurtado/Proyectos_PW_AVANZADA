const express = require('express');
const router = express.Router();

const {
  createUsuario,
  listarUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  registerUsuario,
} = require('../controllers/usuarioController');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas (no requieren token)
router.post('/login', loginUsuario);
router.post('/registro', registerUsuario);

// Rutas protegidas (requieren JWT + rol admin)
router.get('/usuarios', verificarToken, soloAdmin, listarUsuarios);
router.post('/usuarios', verificarToken, soloAdmin, createUsuario);
router.put('/usuarios/:id', verificarToken, soloAdmin, actualizarUsuario);
router.delete('/usuarios/:id', verificarToken, soloAdmin, eliminarUsuario);

module.exports = router;