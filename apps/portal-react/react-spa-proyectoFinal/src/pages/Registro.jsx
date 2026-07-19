import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const { registro } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo_electronico: '',
    programa_academico: '',
    contraseña: '',
    confirmarContraseña: '',
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.nombre || !form.apellidos || !form.correo_electronico || !form.contraseña) {
      setError('Completa todos los campos obligatorios.');
      return;
    }

    if (form.contraseña !== form.confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (form.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);
    try {
      const { confirmarContraseña, ...datos } = form;
      await registro(datos);
      setExito('¡Cuenta creada exitosamente! Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.data?.error || 'Error al crear la cuenta. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '0.75rem',
    color: '#fff',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    color: '#cbd5e1',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '0.4rem',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '1rem',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '480px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
          <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
            Crear cuenta
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
            Únete a la plataforma EduTech
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fca5a5', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            ❌ {error}
          </div>
        )}

        {exito && (
          <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#86efac', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            ✅ {exito}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Nombre *</label>
              <input id="reg-nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Juan" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Apellidos *</label>
              <input id="reg-apellidos" name="apellidos" type="text" value={form.apellidos} onChange={handleChange} placeholder="Pérez García" style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Correo electrónico *</label>
            <input id="reg-email" name="correo_electronico" type="email" value={form.correo_electronico} onChange={handleChange} placeholder="tu@correo.com" style={inputStyle} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Programa académico</label>
            <input id="reg-programa" name="programa_academico" type="text" value={form.programa_academico} onChange={handleChange} placeholder="Ej: Ingeniería de Sistemas" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Contraseña *</label>
              <input id="reg-password" name="contraseña" type="password" value={form.contraseña} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirmar *</label>
              <input id="reg-confirm-password" name="confirmarContraseña" type="password" value={form.confirmarContraseña} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
            </div>
          </div>

          <button
            id="reg-submit"
            type="submit"
            disabled={cargando}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: cargando ? '#475569' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '0.75rem',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: cargando ? 'not-allowed' : 'pointer',
            }}
          >
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', marginTop: '1.5rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#818cf8', fontWeight: '600', textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
