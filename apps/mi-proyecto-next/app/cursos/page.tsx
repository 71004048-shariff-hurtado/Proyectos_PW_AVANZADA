/**
 * Catálogo público de cursos — Next.js (App Router)
 * 
 * Estrategia: SSG con revalidación cada 60 segundos (ISR).
 * Los cursos se generan estáticamente pero se actualizan cada minuto.
 */

const CURSOS_API = process.env.NEXT_PUBLIC_CURSOS_API || 'http://localhost:3001/api';

async function getCursos() {
  try {
    const res = await fetch(`${CURSOS_API}/cursos`, {
      next: { revalidate: 60 }, // ISR: revalidar cada 60 segundos
    });

    if (!res.ok) return [];
    return await res.json();
  } catch {
    // Si el servidor no está disponible, devolver arreglo vacío
    return [];
  }
}

export const metadata = {
  title: 'Catálogo de Cursos — EduTech',
  description: 'Explora todos los cursos disponibles en la plataforma EduTech. Programación web, seguridad, bases de datos y más.',
};

export default async function CatalogoCursosPage() {
  const cursos = await getCursos();

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', padding: '0' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 1rem', background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Catálogo de Cursos
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Explora nuestra oferta académica y encuentra el curso ideal para tu carrera profesional.
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '2rem', padding: '0.4rem 1rem', color: '#a5b4fc', fontSize: '0.85rem' }}>
            📚 {cursos.length} cursos disponibles
          </span>
          <span style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '2rem', padding: '0.4rem 1rem', color: '#86efac', fontSize: '0.85rem' }}>
            ✅ Acceso inmediato
          </span>
          <span style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '2rem', padding: '0.4rem 1rem', color: '#fdba74', fontSize: '0.85rem' }}>
            🏆 Certificado incluido
          </span>
        </div>
      </section>

      {/* Grid de cursos */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {cursos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h2 style={{ color: '#94a3b8' }}>No hay cursos disponibles</h2>
            <p>El servidor de cursos podría estar iniciando. Intenta refrescar la página.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {cursos.map((curso: any) => (
              <article
                key={curso._id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
              >
                {/* Cabecera de la tarjeta */}
                <div style={{
                  background: 'linear-gradient(135deg, #1e293b, #334155)',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {curso.icono || '📚'}
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#f1f5f9', lineHeight: '1.4' }}>
                      {curso.titulo || curso.curso}
                    </h2>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                      👨‍🏫 {curso.docente}
                    </p>
                  </div>
                </div>

                {/* Cuerpo */}
                <div style={{ padding: '1.25rem' }}>
                  {curso.descripcion && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 0 }}>
                      {curso.descripcion.length > 100
                        ? curso.descripcion.substring(0, 100) + '...'
                        : curso.descripcion}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {curso.categoria && (
                      <span style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>
                        {curso.categoria}
                      </span>
                    )}
                    {curso.modalidad && (
                      <span style={{ background: 'rgba(34,197,94,0.15)', color: '#86efac', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>
                        {curso.modalidad}
                      </span>
                    )}
                    {curso.estado && (
                      <span style={{ background: curso.estado === 'Activo' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: curso.estado === 'Activo' ? '#86efac' : '#fca5a5', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>
                        {curso.estado}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                    <div>
                      {curso.horas && (
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>⏱️ {curso.horas} horas</span>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {curso.precio !== undefined && (
                        <span style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '1.1rem' }}>
                          S/ {curso.precio}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={`/cursos/${curso._id}`}
                    style={{
                      display: 'block',
                      marginTop: '1rem',
                      padding: '0.65rem',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      border: 'none',
                      borderRadius: '0.65rem',
                      color: '#fff',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Ver detalles →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
        <p>🎓 EduTech — Plataforma de Gestión de Cursos e Inscripciones</p>
        <p style={{ marginTop: '0.5rem' }}>
          <a href="/" style={{ color: '#6366f1', textDecoration: 'none' }}>Inicio</a>
          {' · '}
          <a href="/contacto" style={{ color: '#6366f1', textDecoration: 'none' }}>Contacto</a>
        </p>
      </footer>
    </main>
  );
}
