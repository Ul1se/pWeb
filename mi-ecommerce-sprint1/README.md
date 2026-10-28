# Mi Ecommerce — Sprint 1 · Programación Web 2026

Proyecto académico desarrollado con Node.js, Express, EJS, HTML semántico, CSS responsivo y JavaScript del navegador.

## Ejecutar

1. Instalar Node.js 18 o superior.
2. Abrir esta carpeta en VS Code.
3. Ejecutar `npm install`.
4. Ejecutar `npm start` (o `npm run dev`).
5. Abrir http://localhost:3000.

## Rutas

- `/` — Inicio y catálogo
- `/products` — Redirige al producto de ejemplo; `/products/:id` muestra uno específico
- `/product` y `/product/:id` — Detalle del producto
- `/cart` — Carrito con cantidades (+/−)
- `/checkout` — Resumen y confirmación demostrativa
- `/login` — Formulario de ingreso
- `/register` — Formulario de registro

## User Stories

US1: Estructura de proyecto con vistas EJS y parciales. US2: Rutas. US3: Registro. US4: Login. US5: Home. US6: Producto. US7: Carrito. US8: Navegación. US9: Diseño responsivo.

## Alcance y limitaciones

El carrito se almacena en localStorage (no en base de datos). Login y registro muestran el flujo de navegación, pero **no autentican ni crean cuentas**. Checkout simula una confirmación sin procesar pagos. Estas funcionalidades reales corresponden a futuros sprints. Los productos son datos de ejemplo. Los gráficos son emojis ilustrativos; se pueden reemplazar por los recursos oficiales del equipo de diseño. Se aplicó una estética propia y coherente, no una reproducción pixel-perfect del Figma.

## Git

`git init` → `git add .` → `git commit -m "Sprint 1: estructura, vistas y navegación"`.

## Pruebas manuales sugeridas

Visitar todas las rutas; abrir un producto; agregarlo al carrito; incrementar y disminuir cantidades; ir a checkout; probar formularios; verificar 404 en `/product/999`; probar vista móvil con herramientas del navegador.
