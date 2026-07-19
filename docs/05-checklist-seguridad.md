# 05 — Checklist de Seguridad

## Estado general del proyecto

| Control | Estado | Evidencia |
|---------|--------|-----------|
| HTTPS en producción | ⏳ Pendiente despliegue | Vercel y Render proveen HTTPS automáticamente |
| CORS restringido | ✅ Implementado | Solo origins autorizados en ambos backends |
| Helmet | ✅ Implementado | `app.use(helmet())` en ambos servidores |
| JWT para autenticación | ✅ Implementado | `jsonwebtoken` con `JWT_SECRET` y expiración 8h |
| bcrypt para contraseñas | ✅ Implementado | `bcryptjs` con salt rounds 10 |
| Variables de entorno | ✅ Implementado | `.env` no commiteado, `.env.example` incluido |
| Tokens no hardcodeados | ✅ Corregido | Se eliminaron tokens `"admin-token-12345"` |
| Autenticación por roles | ✅ Implementado | Middleware `soloAdmin` en rutas de escritura |
| Protección de rutas Frontend | ✅ Implementado | Guard en Angular, `RutaProtegida` en React |
| Validación de entradas | ⚠️ Básica | Validaciones en Mongoose y campos requeridos |
| Límite de body | ✅ Implementado | `express.json({ limit: '10kb' })` |
| Contraseñas en texto plano | ✅ Corregido | Se eliminaron todas las comparaciones en plano |
| Secrets en GitHub | ⚠️ Revisar | Verificar que `.gitignore` excluya `.env` |

---

## CORS — Configuración

```javascript
// Solo estos origins pueden llamar a la API
const allowedOrigins = [
  'http://localhost:5173',  // React
  'http://localhost:4200',  // Angular
  process.env.FRONTEND_URL_REACT,
  process.env.FRONTEND_URL_ANGULAR,
];
```

---

## JWT — Configuración

- **Algoritmo**: HS256 (por defecto en jsonwebtoken)
- **Expiración**: 8 horas (`expiresIn: '8h'`)
- **Payload**: `{ id, role }`
- **Transmisión**: Header `Authorization: Bearer <token>`
- **Secret**: Variable de entorno `JWT_SECRET` (mín. 32 caracteres recomendados)

---

## bcrypt — Configuración

- **Salt rounds**: 10 (balance entre seguridad y velocidad)
- **Uso**: Registro de nuevos estudiantes y verificación en login
- **Biblioteca**: `bcryptjs` (compatible con entornos sin compilación nativa)

---

## Helmet — Headers HTTP de seguridad

Helmet configura automáticamente los siguientes headers:

| Header | Propósito |
|--------|-----------|
| `Content-Security-Policy` | Previene XSS |
| `X-Frame-Options` | Previene clickjacking |
| `X-Content-Type-Options` | Previene MIME sniffing |
| `Referrer-Policy` | Controla información en Referer |
| `X-DNS-Prefetch-Control` | Control de prefetch DNS |
| `Strict-Transport-Security` | Fuerza HTTPS (en producción) |

---

## Protección de Rutas

### Angular (Guard)
```typescript
// Solo admin puede acceder a rutas de administración
if (esRutaAdmin && role !== 'admin') {
  return router.navigate(['/dashboard-estudiante']);
}
```

### React (Componente protegido)
```jsx
function RutaProtegida({ children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
```

---

## Recomendaciones pendientes para producción

- [ ] Agregar `rate limiting` (ej: `express-rate-limit`) en endpoints de login
- [ ] Implementar `refresh tokens` para renovar sesiones sin re-login
- [ ] Agregar validación de emails en el registro (formato + existencia)
- [ ] Implementar HTTPS redirect en Express si no se usa proxy
- [ ] Revisar `Content-Security-Policy` para las SPAs Angular y React
- [ ] Ejecutar `npm audit` y actualizar dependencias vulnerables
- [ ] Configurar logs de acceso y errores (ej: Morgan + archivo de log)

---

## Auditoría Lighthouse

> _(Ejecutar Lighthouse en la URL desplegada de Next.js y agregar captura aquí)_
>
> Herramienta: Chrome DevTools → Lighthouse → Generate Report
> O usar: `npx lighthouse <URL> --output html`

Resultado esperado objetivo:
- Performance: > 70
- Accessibility: > 85
- Best Practices: > 85
- SEO: > 80
