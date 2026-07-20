const mongoose = require('mongoose');

const usuarioDocenteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo_electronico: { type: String, required: true, unique: true },
  especialidad: { type: String, required: false },
  contraseña: { type: String, required: true }
});

module.exports = mongoose.model('UsuarioDocente', usuarioDocenteSchema, 'usuario_docente');
