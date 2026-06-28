const Docente = require('../models/Docente');

exports.crear = async (req, res) => {
    try {
        const nuevo = await Docente.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.listar = async (req, res) => {
    try {
        const docentes = await Docente.find();
        res.json(docentes);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const actualizado = await Docente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(actualizado);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await Docente.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Docente eliminado' });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};
