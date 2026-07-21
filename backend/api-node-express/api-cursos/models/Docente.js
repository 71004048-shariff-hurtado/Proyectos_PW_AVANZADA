const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Docentes', docenteSchema);
