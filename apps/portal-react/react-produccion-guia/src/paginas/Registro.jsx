import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { validarEmail } from "../utilidades";
import { logger } from "../utils/logger";

export default function Registro() {
  const { registrarUsuario, setVista } = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [programa, setPrograma] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas
    if (!nombre || !apellidos || !email || !password || !confirmPassword) {
      setError("Todos los campos obligatorios (*) son requeridos.");
      return;
    }

    if (!validarEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas ingresadas no coinciden.");
      return;
    }

    if (!terms) {
      setError("Debes aceptar los Términos de uso y la Política de privacidad.");
      return;
    }

    // Registrar e iniciar sesión
    try {
      const fullNombre = `${nombre.trim()} ${apellidos.trim()}`;
      const success = registrarUsuario({
        nombre: fullNombre,
        email: email.trim().toLowerCase(),
        carrera: programa || "Ingeniería de Sistemas"
      });

      if (success) {
        logger.info("Registro exitoso de estudiante");
        // El redireccionamiento ya está manejado en registrarUsuario() en AppContext
      } else {
        setError("No se pudo completar el registro.");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado al registrar el usuario.");
      logger.error("Error en registro de usuario", err);
    }
  };

  return (
    <main className="auth-page" role="main" style={{ padding: "var(--space-12) var(--space-4)" }}>
      <div className="auth-card" style={{ maxWidth: "560px" }}>
        
        {/* Logo */}
        <div className="auth-logo">
          <div className="logo-icon" aria-hidden="true" onClick={() => setVista("inicio")} style={{ cursor: "pointer" }}>✨</div>
          <h1>Crear cuenta</h1>
          <p>Regístrate gratis y empieza a aprender hoy mismo</p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="alert alert-danger" role="alert" style={{ marginBottom: "var(--space-5)" }}>
            <span className="alert-icon" aria-hidden="true">⚠️</span>
            <div className="alert-content">
              <div>{error}</div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} aria-label="Formulario de registro" noValidate>
          <div className="form-row cols-2">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Nombre <span className="required" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Ej. Carlos"
                autoComplete="given-name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos" className="form-label">
                Apellidos <span className="required" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                className="form-control"
                placeholder="Ej. García López"
                autoComplete="family-name"
                required
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo electrónico <span className="required" aria-hidden="true">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="tu@correo.edu.pe"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="form-hint">Usa tu correo institucional si tienes acceso al plan universitario.</p>
          </div>

          <div className="form-group">
            <label htmlFor="programa" className="form-label">Programa académico</label>
            <select 
              id="programa" 
              name="programa" 
              className="form-control" 
              aria-label="Seleccionar programa académico"
              value={programa}
              onChange={(e) => setPrograma(e.target.value)}
            >
              <option value="">— Selecciona tu programa —</option>
              <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
              <option value="Ingeniería de Software">Ingeniería de Software</option>
              <option value="Ciencias de la Computación">Ciencias de la Computación</option>
              <option value="Ingeniería Informática">Ingeniería Informática</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña <span className="required" aria-hidden="true">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                required
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className="input-suffix" 
                role="button" 
                tabIndex="0" 
                aria-label="Mostrar/ocultar contraseña"
                onClick={() => setShowPassword(!showPassword)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword); }}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <p className="form-hint">Usa al menos 8 caracteres, una mayúscula y un número.</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">
              Confirmar contraseña <span className="required" aria-hidden="true">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input
                type="password"
                id="confirm-password"
                name="confirm_password"
                className="form-control"
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "var(--space-6)" }}>
            <div className="checkbox-group" style={{ alignItems: "flex-start", gap: "var(--space-3)" }}>
              <input 
                type="checkbox" 
                id="terms" 
                name="terms" 
                required 
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                style={{ marginTop: "3px" }} 
              />
              <label htmlFor="terms" style={{ fontSize: "var(--text-sm)", color: "var(--gray-700)" }}>
                Acepto los <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--primary-600)", fontWeight: 600 }}>Términos de uso</a> y la{" "}
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--primary-600)", fontWeight: 600 }}>Política de privacidad</a> de EduTech Academy.
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg">
            Crear mi cuenta gratis →
          </button>
        </form>

        <p className="auth-footer-text">
          ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setVista("login"); }}>Iniciar sesión</a>
        </p>

      </div>
    </main>
  );
}
