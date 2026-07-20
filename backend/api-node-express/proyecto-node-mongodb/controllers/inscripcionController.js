const Inscripcion = require('../models/Inscripcion');

/**
 * POST /api/inscripciones
 * Inscribir a un estudiante en un curso.
 * Body: { estudianteId, cursoId, nombreCurso, docente }
 */
exports.inscribirse = async (req, res) => {
  const { estudianteId, cursoId, nombreCurso, docente } = req.body;

  if (!estudianteId || !cursoId || !nombreCurso) {
    return res.status(400).json({ error: 'estudianteId, cursoId y nombreCurso son requeridos.' });
  }

  try {
    const nueva = await Inscripcion.create({
      estudianteId,
      cursoId,
      nombreCurso,
      docente: docente || '',
    });
    res.status(201).json(nueva);
  } catch (error) {
    // Error de duplicado (index único)
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Ya estás inscrito en este curso.' });
    }
    res.status(400).json({ error: error.message });
  }
};

/**
 * GET /api/inscripciones/estudiante/:estudianteId
 * Obtener todas las inscripciones de un estudiante.
 */
exports.misInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find({
      estudianteId: req.params.estudianteId,
    }).sort({ fechaInscripcion: -1 });

    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/inscripciones/docente/:nombre
 * Obtener todas las inscripciones en los cursos de un docente.
 */
exports.inscripcionesPorDocente = async (req, res) => {
  try {
    const nombreDocente = req.params.nombre;
    const inscripciones = await Inscripcion.find({
      docente: { $regex: new RegExp(nombreDocente, 'i') }
    })
    .populate('estudianteId', 'nombre apellidos correo_electronico programa_academico')
    .sort({ fechaInscripcion: -1 });

    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/inscripciones
 * Listar todas las inscripciones (solo admin).
 */
exports.listarTodas = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
      .populate('estudianteId', 'nombre apellidos correo_electronico')
      .sort({ fechaInscripcion: -1 });
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /api/inscripciones/:id/progreso
 * Actualizar el progreso de una inscripción.
 * Body: { progreso, estado }
 */
exports.actualizarProgreso = async (req, res) => {
  const { progreso, estado } = req.body;
  try {
    const actualizada = await Inscripcion.findByIdAndUpdate(
      req.params.id,
      { progreso, estado },
      { new: true }
    );
    if (!actualizada) return res.status(404).json({ error: 'Inscripción no encontrada.' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * DELETE /api/inscripciones/:id
 * Cancelar una inscripción.
 */
exports.cancelar = async (req, res) => {
  try {
    const eliminada = await Inscripcion.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Inscripción no encontrada.' });
    res.json({ mensaje: 'Inscripción cancelada exitosamente.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
