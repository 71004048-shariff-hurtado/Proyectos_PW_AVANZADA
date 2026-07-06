const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
  correo_electronico: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Administrador', administradorSchema, 'administrador');
