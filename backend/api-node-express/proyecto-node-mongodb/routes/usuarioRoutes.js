const express = require('express');
const router = express.Router();

const{
    createUsuario,listarUsuarios,actualizarUsuario,eliminarUsuario
} = require('../controllers/usuarioController');

router.post('/usuarios', createUsuario);
router.get('/usuarios', listarUsuarios);
router.put('/usuarios', actualizarUsuario);
router.delete('/usuarios', eliminarUsuario);