# Mi Ecommerce — Sprint 6 (Seguridad)

Continúa el Sprint 5. Implementa las cinco User Stories originales: registro SQLite con bcrypt, login JWT, verificación Bearer, autorización por roles y sesiones EJS.

## Inicio

1. `npm install`
2. Copiar `.env.example` a `.env` y establecer **dos secretos distintos y aleatorios** para `SESSION_SECRET` y `JWT_SECRET`.
3. `npm run migrate`
4. `npm start`
5. Abrir http://localhost:3000

Crear un administrador local: `npm run create-admin -- admin@ejemplo.com "UnaClaveSegura123!" "Admin"`. No utilizar credenciales de ejemplo en producción.

## API

- `POST /api/auth/register` con JSON `{ "name":"Ana", "email":"ana@ejemplo.com", "password":"claveSegura123" }` — 201; duplicado 409.
- `POST /api/auth/login` con email/password — devuelve `{token,tokenType,user}`; error 401.
- `GET /api/auth/me` — requiere `Authorization: Bearer TOKEN`.
- GET de productos/categorías y estadísticas permanecen públicos.
- POST, PUT y DELETE de productos requieren Bearer válido **y** rol `admin` (401 sin token, 403 sin permiso).

## EJS

Registro y login guardan sesión; navegación contextual; `POST /logout`; carrito y pedidos requieren login; `/admin` requiere rol admin. Los pedidos son una pantalla de preparación: el checkout aún no crea pedidos reales.

## Notas

No subir `.env` ni el archivo SQLite al repositorio. Para producción: HTTPS, almacén de sesiones persistente, protección CSRF, rate limiting y políticas CORS restrictivas. La API de categorías conserva el CRUD del Sprint 5; sus escrituras no se restringen aquí porque la US4 solo exige proteger las de productos. Se recomienda protegerlas también antes de desplegar.

Entregar en un repositorio Git. Verificar `npm test`, login, roles y la navegación antes de presentar.

## Versión final integrada (Sprints 1–6)

Este directorio reúne el avance acumulado de los seis sprints. Correcciones de revisión: operaciones de escritura de categorías protegidas con JWT y rol administrador; cookie de sesión `secure` en producción; endpoint `GET /health`.

### Verificación efectuada
- Sintaxis de todos los archivos JavaScript: correcta (`node --check`).
- `npm install --offline`: **no completado** por falta de `bcrypt` en caché.
- Por esa limitación no se ejecutaron pruebas de integración ni de navegador; **no está certificado como listo para entrega**.

### Checklist antes de entregar
1. `npm install` con conexión a Internet y Node.js compatible con `better-sqlite3`.
2. Copiar `.env.example` a `.env`, reemplazando ambos secretos por valores aleatorios diferentes.
3. `npm run migrate`, `npm test`, `npm start`.
4. Probar `/`, `/products`, carrito, registro/login, WebSocket en dos pestañas y endpoints API.
5. Crear usuario admin con `npm run create-admin -- correo@ejemplo.com "ClaveSegura123!" "Admin"`.
6. Confirmar que GET de categorías/productos es público y que POST/PUT/DELETE requieren JWT admin.
7. Subir el código a GitHub sin `.env`, `node_modules` ni archivos SQLite.

### Advertencia de despliegue
Esta aplicación es una entrega académica. Antes de usarla en producción se necesitan, entre otros, protección CSRF, rate limiting, almacén persistente de sesiones, validaciones de seguridad adicionales y configuración de CORS por origen.
