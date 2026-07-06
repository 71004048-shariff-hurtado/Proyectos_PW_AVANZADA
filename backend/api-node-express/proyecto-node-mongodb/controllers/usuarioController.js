const Usuario = require('../models/Usuario');
const UsuarioEstudiante = require('../models/UsuarioEstudiante');
const Administrador = require('../models/Administrador');

exports.createUsuario = async(req, res) =>{
    try {
        const nuevo = await Usuario.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
        
    }
};

exports.listarUsuarios =  async(req, res) =>{
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
        
    }
}

exports.actualizarUsuario = async(req, res) =>{
    try {
        const actualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

exports.eliminarUsuario = async (req, res)=>{
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({mensaje:"Usuario eliminado"});
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check in administrador collection
        const admin = await Administrador.findOne({ correo_electronico: email, contraseña: password });
        if (admin) {
            return res.json({
                msg: "Login correcto",
                token: "admin-token-12345",
                role: "admin",
                user: {
                    id: admin._id,
                    correo_electronico: admin.correo_electronico,
                    nombre: "Administrador"
                }
            });
        }

        // Check in usuario_estudiante collection
        const estudiante = await UsuarioEstudiante.findOne({ correo_electronico: email, contraseña: password });
        if (estudiante) {
            return res.json({
                msg: "Login correcto",
                token: "student-token-12345",
                role: "student",
                user: {
                    id: estudiante._id,
                    nombre: estudiante.nombre,
                    apellidos: estudiante.apellidos,
                    correo_electronico: estudiante.correo_electronico,
                    programa_academico: estudiante.programa_academico
                }
            });
        }

        return res.status(401).json({ error: "Credenciales inválidas" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.registerUsuario = async (req, res) => {
    const { nombre, apellidos, correo_electronico, programa_academico, contraseña } = req.body;
    try {
        // Check if student exists
        const existsEstudiante = await UsuarioEstudiante.findOne({ correo_electronico });
        const existsAdmin = await Administrador.findOne({ correo_electronico });
        if (existsEstudiante || existsAdmin) {
            return res.status(400).json({ error: "El correo electrónico ya se encuentra registrado." });
        }

        const nuevoEstudiante = new UsuarioEstudiante({
            nombre,
            apellidos,
            correo_electronico,
            programa_academico,
            contraseña
        });

        await nuevoEstudiante.save();
        res.status(201).json({
            msg: "Registro exitoso",
            user: {
                id: nuevoEstudiante._id,
                nombre: nuevoEstudiante.nombre,
                apellidos: nuevoEstudiante.apellidos,
                correo_electronico: nuevoEstudiante.correo_electronico,
                programa_academico: nuevoEstudiante.programa_academico
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};