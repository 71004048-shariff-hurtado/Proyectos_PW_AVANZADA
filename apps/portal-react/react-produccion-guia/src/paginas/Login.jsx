import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { validarEmail } from "../utilidades";
import { logger } from "../utils/logger";

export default function Login() {
  const { login, setVista } = useContext(AppContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas
    if (!email || !password) {
      setError("Todos los campos obligatorios (*) deben ser completados.");
      return;
    }

    if (!validarEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    // Intenta iniciar sesión
    try {
      const success = login(email, password);
      if (success) {
        // Redirige al panel correspondiente (ya gestionado dentro de login() en AppContext)
        logger.info("Navegando al panel del usuario autenticado");
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado al iniciar sesión.");
      logger.error("Error en login de usuario", err);
    }
  };

  // Rellenar automáticamente datos de prueba
  const handleLoadDemo = (roleType) => {
    if (roleType === "estudiante") {
      setEmail("estudiante@edutech.pe");
      setPassword("demo123");
    } else if (roleType === "admin") {
      setEmail("admin@edutech.pe");
      setPassword("admin123");
    }
  };

  return (
    <main className="auth-page" role="main">
      <div className="auth-card">
        
        {/* Logo y título */}
        <div className="auth-logo">
          <div className="logo-icon" aria-hidden="true" onClick={() => setVista("inicio")} style={{ cursor: "pointer" }}>🎓</div>
          <h1>Bienvenido de vuelta</h1>
          <p>Ingresa a tu cuenta para continuar aprendiendo</p>
        </div>

        {/* Demo Accounts Alerts */}
        <div className="card" style={{ marginBottom: "var(--space-5)", background: "var(--gray-50)", padding: "var(--space-3)" }}>
          <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, textTransform: "uppercase", color: "var(--primary-600)", marginBottom: "var(--space-2)" }}>
            💡 Cuentas demo rápidas:
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <button 
              className="btn btn-ghost btn-xs" 
              onClick={() => handleLoadDemo("estudiante")}
              style={{ fontSize: "11px", padding: "4px 8px" }}
            >
              👨‍🎓 Estudiante demo
            </button>
            <button 
              className="btn btn-ghost btn-xs" 
              onClick={() => handleLoadDemo("admin")}
              style={{ fontSize: "11px", padding: "4px 8px" }}
            >
              🛠️ Admin demo
            </button>
          </div>
        </div>

        {/* Mensaje de error si existe */}
        {error && (
          <div className="alert alert-danger" role="alert" style={{ marginBottom: "var(--space-5)" }}>
            <span className="alert-icon" aria-hidden="true">⚠️</span>
            <div className="alert-content">
              <div>{error}</div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión" noValidate>
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
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                required
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
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
            <div className="checkbox-group">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Recordarme</label>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setError("La recuperación de contraseña está deshabilitada en esta demo."); }} style={{ fontSize: "var(--text-sm)", color: "var(--primary-600)", fontWeight: 600 }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg">
            Ingresar a mi cuenta →
          </button>
        </form>

        <div className="auth-divider">o continúa con</div>

        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <button type="button" className="btn btn-ghost w-full" onClick={() => login("estudiante@edutech.pe")} aria-label="Iniciar sesión con Google">
            🔵 Google
          </button>
          <button type="button" className="btn btn-ghost w-full" onClick={() => login("admin@edutech.pe")} aria-label="Iniciar sesión con Microsoft">
            🟦 Microsoft
          </button>
        </div>

        <p className="auth-footer-text">
          ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setVista("registro"); }}>Regístrate gratis</a>
        </p>

      </div>
    </main>
  );
}
