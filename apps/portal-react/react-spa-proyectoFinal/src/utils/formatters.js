// Utilidades para formateo y funciones comunes

export function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(precio);
}

export function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(fecha));
}

export function calcularCalificacionPromedio(calificacion) {
  return `${calificacion.toFixed(1)} ⭐`;
}

export function obtenerColorEstado(estado) {
  const colores = {
    'En progreso': '#3b82f6',
    'Completado': '#10b981',
    'No iniciado': '#ef4444'
  };
  return colores[estado] || '#6b7280';
}

export function obtenerColorCategoria(categoria) {
  const colores = {
    'Frontend': '#4f46e5',
    'Backend': '#059669',
    'Full Stack': '#9333ea',
    'Seguridad': '#dc2626',
    'Base de Datos': '#ea580c',
    'DevOps': '#0891b2'
  };
  return colores[categoria] || '#6b7280';
}

export function truncarTexto(texto, limite = 100) {
  if (texto.length <= limite) return texto;
  return texto.substring(0, limite) + '...';
}
