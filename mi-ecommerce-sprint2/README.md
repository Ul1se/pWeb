# Mi Ecommerce — Sprint 2 (Programación Web 2026)

Continuación del Sprint 1, con MVC, EJS, datos locales y carrito en sesión.

## Ejecutar

```bash
npm install
npm start
```

Abrí http://localhost:3000. Para pruebas: `npm test`.

## Rutas

- `/` inicio, sugeridos y más pedidos
- `/products` catálogo (`?sort=asc` o `desc`)
- `/products/:id` detalle y relacionados
- `/categories/:category` categorías
- `/search?query=...` búsqueda
- `/cart` carrito; operaciones mediante POST
- `/checkout` vista temporal
- `/register` validación de formulario en navegador (registro real se implementará en Sprint 3)
- `/login` pantalla de acceso, sin autenticación real

## Arquitectura

`routes/` → `controllers/` → `services/` → `models/` → `data/`. Vistas EJS en `views/`; diseño y JS público en `assets/`.

## Notas

- No hay base de datos ni API REST: las User Stories del Sprint 2 indican explícitamente no utilizarlas.
- Carrito en `req.session.cart` con `{productId,quantity}` exclusivamente. Sesión de desarrollo con MemoryStore; no apta para producción. Cookie de sesión sin `maxAge` (se elimina al cerrar navegador, sujeto a restauración de sesiones del navegador).
- Los productos son datos de demostración heredados del Sprint 1; `stock` e `image` se completan en el servicio para este ejercicio.
- Registro: validación de cliente, sin almacenar cuentas. No enviar contraseñas reales.
- Para publicar en producción, configurar SESSION_SECRET, HTTPS, CSRF y almacenamiento persistente de sesiones.
