import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

export const AuthContext = createContext();

/**
 * Proveedor de autenticación global.
 * Gestiona: sesión, token JWT, datos del usuario y rol.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al montar, restaurar sesión desde localStorage
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('currentUser');
    if (tokenGuardado && usuarioGuardado) {
      try {
        setToken(tokenGuardado);
        setUsuario(JSON.parse(usuarioGuardado));
      } catch {
        localStorage.clear();
      }
    }
    setCargandoSesion(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.login(email, password);
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('currentUser', JSON.stringify({ ...res.user, role: res.role }));
    setToken(res.token);
    setUsuario({ ...res.user, role: res.role });
    return res;
  }, []);

  const registro = useCallback(async (datos) => {
    return await api.registro(datos);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    setToken(null);
    setUsuario(null);
  }, []);

  const isAuthenticated = !!token;
  const role = usuario?.role || null;

  return (
    <AuthContext.Provider
      value={{ usuario, token, isAuthenticated, role, cargandoSesion, login, registro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto de auth
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
