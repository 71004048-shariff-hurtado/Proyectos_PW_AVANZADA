const mongoose = require('mongoose');

const cursosSchema = new mongoose.Schema({
    curso:{
        type: String,
        required: true
    },
    docente:{
        type: String,
        required: true
    },
    categorias:{
        type: String,
        required: true
    },
    insctritos:{
        type: String,
        required: true
    },
    precio:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cursos',cursosSchema);