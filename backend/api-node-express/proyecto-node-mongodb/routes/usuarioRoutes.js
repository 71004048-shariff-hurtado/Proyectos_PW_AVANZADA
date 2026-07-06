const express = require('express');
const router = express.Router();

const {
    createUsuario,
    listarUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
    registerUsuario
} = require('../controllers/usuarioController');

router.post('/usuarios', createUsuario);
router.get('/usuarios', listarUsuarios);
router.put('/usuarios', actualizarUsuario);
router.delete('/usuarios', eliminarUsuario);

router.post('/login', loginUsuario);
router.post('/registro', registerUsuario);

module.exports = router;