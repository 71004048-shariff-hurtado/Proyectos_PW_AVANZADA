const mongoose = require('mongoose');

const usuarioEstudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  correo_electronico: {
    type: String,
    required: true,
    unique: true
  },
  programa_academico: {
    type: String,
    required: false
  },
  contraseña: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UsuarioEstudiante', usuarioEstudianteSchema, 'usuario_estudiante');
