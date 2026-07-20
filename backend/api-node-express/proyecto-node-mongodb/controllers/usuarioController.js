const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const UsuarioEstudiante = require('../models/UsuarioEstudiante');
const UsuarioDocente = require('../models/UsuarioDocente');
const Administrador = require('../models/Administrador');

// Función helper para generar JWT
function generarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
}

// ────────────────────────────────────────────────────
// AUTH
// ────────────────────────────────────────────────────

/**
 * POST /api/login
 */
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
  }

  try {
    // Verificar si es administrador
    const admin = await Administrador.findOne({ correo_electronico: email });
    if (admin) {
      const coincide = await bcrypt.compare(password, admin.contraseña);
      if (!coincide) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
      const token = generarToken({ id: admin._id, role: 'admin' });
      return res.json({
        msg: 'Login correcto',
        token,
        role: 'admin',
        user: {
          id: admin._id,
          correo_electronico: admin.correo_electronico,
          nombre: 'Administrador',
        },
      });
    }

    // Verificar si es estudiante
    const estudiante = await UsuarioEstudiante.findOne({ correo_electronico: email });
    if (estudiante) {
      const coincide = await bcrypt.compare(password, estudiante.contraseña);
      if (!coincide) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
      const token = generarToken({ id: estudiante._id, role: 'student' });
      return res.json({
        msg: 'Login correcto',
        token,
        role: 'student',
        user: {
          id: estudiante._id,
          nombre: estudiante.nombre,
          apellidos: estudiante.apellidos,
          correo_electronico: estudiante.correo_electronico,
          programa_academico: estudiante.programa_academico,
        },
      });
    }

    // Verificar si es docente
    const docente = await UsuarioDocente.findOne({ correo_electronico: email });
    if (docente) {
      const coincide = await bcrypt.compare(password, docente.contraseña);
      if (!coincide) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
      const token = generarToken({ id: docente._id, role: 'docente' });
      return res.json({
        msg: 'Login correcto',
        token,
        role: 'docente',
        user: {
          id: docente._id,
          nombre: docente.nombre,
          apellidos: docente.apellidos,
          correo_electronico: docente.correo_electronico,
          especialidad: docente.especialidad,
        },
      });
    }

    return res.status(401).json({ error: 'Credenciales inválidas.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/registro
 */
exports.registerUsuario = async (req, res) => {
  const { nombre, apellidos, correo_electronico, programa_academico, contraseña } = req.body;

  if (!nombre || !apellidos || !correo_electronico || !contraseña) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos.' });
  }

  try {
    // Verificar email duplicado
    const existsEstudiante = await UsuarioEstudiante.findOne({ correo_electronico });
    const existsAdmin = await Administrador.findOne({ correo_electronico });
    if (existsEstudiante || existsAdmin) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoEstudiante = new UsuarioEstudiante({
      nombre,
      apellidos,
      correo_electronico,
      programa_academico,
      contraseña: hash,
    });

    await nuevoEstudiante.save();

    res.status(201).json({
      msg: 'Registro exitoso',
      user: {
        id: nuevoEstudiante._id,
        nombre: nuevoEstudiante.nombre,
        apellidos: nuevoEstudiante.apellidos,
        correo_electronico: nuevoEstudiante.correo_electronico,
        programa_academico: nuevoEstudiante.programa_academico,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ────────────────────────────────────────────────────
// CRUD de Usuarios (solo admin)
// ────────────────────────────────────────────────────

exports.createUsuario = async (req, res) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioEstudiante.find().select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const actualizado = await UsuarioEstudiante.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-contraseña');
    if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    await UsuarioEstudiante.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};