const express = require('express');
const router = express.Router();

const {
    crear,
    listar,
    actualizar,
    eliminar
} = require('../controllers/docenteController');

router.post('/docentes', crear);
router.get('/docentes', listar);
router.put('/docentes/:id', actualizar);
router.delete('/docentes/:id', eliminar);

module.exports = router;
