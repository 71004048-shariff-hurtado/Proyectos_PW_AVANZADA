const jwt = require('jsonwebtoken');

/**
 * Middleware: verifica que el request tenga un JWT válido.
 * Adjunta el payload decodificado en req.usuario.
 */
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
}

/**
 * Middleware: permite acceso solo a usuarios con rol 'admin'.
 * Debe usarse después de verificarToken.
 */
function soloAdmin(req, res, next) {
  if (req.usuario?.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }
  next();
}

module.exports = { verificarToken, soloAdmin };
