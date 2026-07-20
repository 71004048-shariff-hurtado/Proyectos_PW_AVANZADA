const mongoose = require('mongoose');

const cursosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    docente: {
        type: String,
        required: [true, 'El docente es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    },
    horas: {
        type: Number,
        required: [true, 'Las horas son obligatorias'],
        min: 1
    },
    modalidad: {
        type: String,
        enum: ['Virtual', 'Presencial', 'Híbrida'],
        default: 'Virtual'
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: 0
    },
    descripcion: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo', 'Borrador'],
        default: 'Activo'
    },
    icono: {
        type: String,
        default: '📚'
    },
    color: {
        type: String,
        default: 'linear-gradient(135deg,#1a1a2e,#7c3aed)'
    }
}, { timestamps: true });

module.exports = mongoose.model('Cursos', cursosSchema);