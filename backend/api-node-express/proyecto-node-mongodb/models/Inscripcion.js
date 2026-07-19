const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema(
  {
    estudianteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UsuarioEstudiante',
      required: true,
    },
    cursoId: {
      type: String, // Referencia al _id del curso en api-cursos (puerto 3001)
      required: true,
    },
    nombreCurso: {
      type: String,
      required: true,
    },
    docente: {
      type: String,
      default: '',
    },
    progreso: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    estado: {
      type: String,
      enum: ['progreso', 'completado'],
      default: 'progreso',
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Evitar que un estudiante se inscriba dos veces al mismo curso
inscripcionSchema.index({ estudianteId: 1, cursoId: 1 }, { unique: true });

module.exports = mongoose.model('Inscripcion', inscripcionSchema);
