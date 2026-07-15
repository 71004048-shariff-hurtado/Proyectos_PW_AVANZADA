import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function PaginaInicio() {
  const { courses, setVista, setSelectedCourseId } = useContext(AppContext);

  const handleVerCurso = (courseId) => {
    setSelectedCourseId(courseId);
    setVista("detalle-curso");
  };

  return (
    <main className="page-content">
      {/* ===== HERO ===== */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow" aria-label="Certificados por universidades">
              ✦ Plataforma académica certificada
            </div>
            <h1 id="hero-heading" className="hero-title">
              Aprende, crece y<br />
              <span className="highlight">lidera el futuro</span><br />
              tecnológico
            </h1>
            <p className="hero-subtitle">
              Formación de calidad universitaria en programación, desarrollo web, backend, bases de datos y más. Accede desde cualquier dispositivo.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); setVista("cursos"); }}>Explorar cursos</a>
              <a href="#" className="btn btn-secondary btn-lg" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.4)" }} onClick={(e) => { e.preventDefault(); setVista("registro"); }}>Crear cuenta gratis</a>
            </div>
            <div className="hero-stats" role="list" aria-label="Estadísticas de la plataforma">
              <div className="hero-stat" role="listitem">
                <div className="value">1,240+</div>
                <div className="label">Estudiantes activos</div>
              </div>
              <div className="hero-stat" role="listitem">
                <div className="value">48</div>
                <div className="label">Cursos disponibles</div>
              </div>
              <div className="hero-stat" role="listitem">
                <div className="value">12</div>
                <div className="label">Docentes expertos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="section bg-gray" id="beneficios" aria-labelledby="beneficios-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">¿Por qué EduTech?</span>
            <h2 id="beneficios-heading" className="section-title">Todo lo que necesitas para aprender</h2>
            <p className="section-subtitle">Una plataforma pensada para estudiantes universitarios y profesionales que buscan crecer en tecnología.</p>
          </div>
          <div className="grid grid-3">
            <article className="benefit-card">
              <div className="benefit-icon" style={{ background: "var(--primary-100)" }} aria-hidden="true">📖</div>
              <h3>Cursos estructurados</h3>
              <p>Contenido organizado por módulos, sesiones y actividades prácticas, diseñados por docentes universitarios con experiencia real en la industria.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon" style={{ background: "var(--accent-100)" }} aria-hidden="true">🖥️</div>
              <h3>Acceso multiplataforma</h3>
              <p>Estudia desde tu computador, tablet o celular. Tu progreso se sincroniza automáticamente en todos tus dispositivos.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon" style={{ background: "var(--success-100)" }} aria-hidden="true">🏆</div>
              <h3>Certificados reconocidos</h3>
              <p>Al completar cada curso obtienes un certificado de finalización con aval académico, útil para tu portafolio profesional.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon" style={{ background: "var(--warning-100)" }} aria-hidden="true">⚡</div>
              <h3>Aprendizaje activo</h3>
              <p>Ejercicios prácticos, proyectos reales y evaluaciones formativas que refuerzan cada concepto aprendido.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon" style={{ background: "var(--danger-100)" }} aria-hidden="true">👥</div>
              <h3>Comunidad de aprendizaje</h3>
              <p>Conecta con compañeros y docentes a través de foros, sesiones en vivo y grupos de estudio colaborativo.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon" style={{ background: "var(--primary-100)" }} aria-hidden="true">📊</div>
              <h3>Seguimiento de avance</h3>
              <p>Visualiza tu progreso en tiempo real con métricas claras sobre tu rendimiento, asistencia y finalización de actividades.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CURSOS DESTACADOS ===== */}
      <section className="section" aria-labelledby="cursos-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Cursos destacados</span>
            <h2 id="cursos-heading" className="section-title">Los más populares este semestre</h2>
            <p className="section-subtitle">Seleccionados por nuestros docentes y calificados por estudiantes activos.</p>
          </div>
          <div className="grid grid-3">
            {courses.slice(0, 6).map((curso) => {
              const bgGradient = curso.id === 1 ? "linear-gradient(135deg,#1e3a5f,#2563eb)" :
                                 curso.id === 2 ? "linear-gradient(135deg,#1a1a2e,#7c3aed)" :
                                 curso.id === 3 ? "linear-gradient(135deg,#064e3b,#059669)" :
                                 curso.id === 4 ? "linear-gradient(135deg,#431407,#ea580c)" :
                                 curso.id === 5 ? "linear-gradient(135deg,#1e1b4b,#4338ca)" :
                                                  "linear-gradient(135deg,#0c4a6e,#0891b2)";
              return (
                <article className="course-card" key={curso.id}>
                  <div className="course-card-image" style={{ background: bgGradient }}>
                    <div className="course-thumb-placeholder" aria-label={`Imagen curso ${curso.title}`}>{curso.icon}</div>
                    <span className={`course-card-badge badge ${curso.badgeClass} no-dot`}>{curso.category}</span>
                  </div>
                  <div className="course-card-body">
                    <div className="course-category">{curso.category}</div>
                    <h3 className="course-title">{curso.title}</h3>
                    <p className="course-instructor">👨‍🏫 {curso.instructor} · <strong>{curso.rating} ★</strong></p>
                    <div className="course-meta">
                      <span className="course-meta-item">🕒 {curso.hours} horas</span>
                      <span className="course-meta-item">🎥 Video + Labs</span>
                      <span className="course-meta-item">👥 {curso.studentsCount} alumnos</span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <div className="course-price">
                      {curso.price === 0 ? <span className="free">Gratuito</span> : <><span className="currency">S/</span> {curso.price}</>}
                    </div>
                    <a href="#" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); handleVerCurso(curso.id); }}>Ver curso</a>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
            <a href="#" className="btn btn-secondary btn-lg" onClick={(e) => { e.preventDefault(); setVista("cursos"); }}>Ver todos los cursos →</a>
          </div>
        </div>
      </section>

      {/* ===== DOCENTES ===== */}
      <section className="section bg-gray" aria-labelledby="docentes-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nuestro equipo</span>
            <h2 id="docentes-heading" className="section-title">Docentes expertos en tecnología</h2>
            <p className="section-subtitle">Profesionales activos en la industria que comparten su experiencia real.</p>
          </div>
          <div className="grid grid-3">
            <div className="card" style={{ textAlign: "center" }}>
              <div className="avatar xl" style={{ margin: "0 auto var(--space-4)" }} aria-label="Foto de Juan Pérez">JP</div>
              <h4>Juan Pérez</h4>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--primary-600)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Especialista Frontend</p>
              <p style={{ fontSize: "var(--text-sm)" }}>10 años de experiencia en React, Vue y Angular. Ex-developer en startups de Lima.</p>
              <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
                <span className="badge badge-primary no-dot">React</span>
                <span className="badge badge-accent no-dot">Vue</span>
                <span className="badge badge-gray no-dot">TypeScript</span>
              </div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div className="avatar xl" style={{ margin: "0 auto var(--space-4)", background: "linear-gradient(135deg,#7c3aed,#ec4899)" }} aria-label="Foto de María Torres">MT</div>
              <h4>María Torres</h4>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--accent-600)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Arquitecta Full Stack</p>
              <p style={{ fontSize: "var(--text-sm)" }}>Arquitecta de software con enfoque en sistemas distribuidos, MongoDB y microservicios.</p>
              <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
                <span className="badge badge-success no-dot">Node.js</span>
                <span className="badge badge-primary no-dot">MongoDB</span>
                <span className="badge badge-gray no-dot">Docker</span>
              </div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div className="avatar xl" style={{ margin: "0 auto var(--space-4)", background: "linear-gradient(135deg,#059669,#0891b2)" }} aria-label="Foto de Luis Ramírez">LR</div>
              <h4>Luis Ramírez</h4>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--success-600)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Ingeniero DevOps</p>
              <p style={{ fontSize: "var(--text-sm)" }}>DevOps engineer con experiencia en AWS, CI/CD pipelines y automatización de infraestructura.</p>
              <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
                <span className="badge badge-warning no-dot">AWS</span>
                <span className="badge badge-gray no-dot">Kubernetes</span>
                <span className="badge badge-success no-dot">Terraform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">¿Listo para comenzar tu formación?</h2>
          <p>Únete a más de 1,200 estudiantes que ya están construyendo su futuro en tecnología con EduTech Academy.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <a href="#" className="btn btn-lg" style={{ background: "var(--white)", color: "var(--primary-600)", fontWeight: 700 }} onClick={(e) => { e.preventDefault(); setVista("registro"); }}>Crear cuenta gratuita</a>
            <a href="#" className="btn btn-lg" style={{ background: "transparent", color: "var(--white)", border: "2px solid rgba(255,255,255,.5)" }} onClick={(e) => { e.preventDefault(); setVista("cursos"); }}>Ver catálogo →</a>
          </div>
        </div>
      </section>
    </main>
  );
}