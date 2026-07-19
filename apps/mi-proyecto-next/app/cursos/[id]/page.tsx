/**
 * Detalle de curso — Next.js (App Router)
 * 
 * Estrategia: SSR con force-dynamic.
 * Cada visita al detalle genera la página en el servidor (datos siempre frescos).
 */

export const dynamic = 'force-dynamic';

import Link from 'next/link';

const CURSOS_API = process.env.NEXT_PUBLIC_CURSOS_API || 'http://localhost:3001/api';

type Curso = {
  _id: string;
  titulo?: string;
  curso?: string;
  docente: string;
  categoria?: string;
  categorias?: string;
  horas?: number;
  modalidad?: string;
  precio?: number;
  descripcion?: string;
  estado?: string;
  icono?: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

async function getCurso(id: string): Promise<Curso | null> {
  try {
    const res = await fetch(`${CURSOS_API}/cursos`, { cache: 'no-store' });
    if (!res.ok) return null;
    const cursos: Curso[] = await res.json();
    return cursos.find((c) => c._id === id) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const curso = await getCurso(id);
  return {
    title: curso
      ? `${curso.titulo || curso.curso} — EduTech`
      : 'Curso no encontrado — EduTech',
    description: curso?.descripcion || 'Detalle del curso en la plataforma EduTech.',
  };
}

export default async function DetalleCursoPage({ params }: Props) {
  const { id } = await params;
  const curso = await getCurso(id);
  const fechaConsulta = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

  if (!curso) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Curso no encontrado</h1>
          <Link href="/cursos" style={{ color: '#818cf8', textDecoration: 'none' }}>← Volver al catálogo</Link>
        </div>
      </main>
    );
  }

  const titulo = curso.titulo || curso.curso || 'Sin título';
  const categoria = curso.categoria || curso.categorias || '';

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: '#fff' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/cursos" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.875rem' }}>
            ← Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

          {/* Tarjeta principal */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', overflow: 'hidden' }}>
            {/* Hero del curso */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              padding: '2.5rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}>
              <div style={{
                width: '80px', height: '80px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0,
              }}>
                {curso.icono || '📚'}
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: '800', lineHeight: '1.3' }}>
                  {titulo}
                </h1>
                <p style={{ margin: '0 0 1rem', color: '#94a3b8' }}>👨‍🏫 Docente: <strong style={{ color: '#e2e8f0' }}>{curso.docente}</strong></p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {categoria && (
                    <span style={{ background: 'rgba(99,102,241,0.25)', color: '#a5b4fc', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>
                      {categoria}
                    </span>
                  )}
                  {curso.modalidad && (
                    <span style={{ background: 'rgba(34,197,94,0.15)', color: '#86efac', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>
                      {curso.modalidad}
                    </span>
                  )}
                  {curso.estado && (
                    <span style={{ background: 'rgba(34,197,94,0.15)', color: '#86efac', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>
                      ✅ {curso.estado}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div style={{ padding: '2rem' }}>
              {curso.descripcion && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: '#f1f5f9' }}>📋 Descripción del curso</h2>
                  <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>{curso.descripcion}</p>
                </div>
              )}

              {/* Métricas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {curso.horas && (
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⏱️</div>
                    <div style={{ fontWeight: '700', color: '#f1f5f9' }}>{curso.horas} horas</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Duración</div>
                  </div>
                )}
                {curso.precio !== undefined && (
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💰</div>
                    <div style={{ fontWeight: '700', color: '#f1f5f9' }}>S/ {curso.precio}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Precio</div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(99,102,241,0.08)', borderRadius: '1rem', border: '1px solid rgba(99,102,241,0.2)' }}>
                <h3 style={{ margin: '0 0 0.75rem', color: '#f1f5f9' }}>¿Listo para inscribirte?</h3>
                <p style={{ color: '#94a3b8', margin: '0 0 1.25rem', fontSize: '0.875rem' }}>
                  Inicia sesión en el portal del estudiante para inscribirte en este curso.
                </p>
                <a
                  href="http://localhost:5173/login"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 2rem',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontWeight: '700',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  Inscribirme ahora →
                </a>
              </div>

              {/* Generado por SSR */}
              <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#475569', textAlign: 'center' }}>
                🖥️ Página generada por SSR el {fechaConsulta}
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
