# Mi Ecommerce — Sprint 3

Migración a SQLite con `better-sqlite3`, conservando Express, EJS, MVC y carrito en sesión.

## Instalar y ejecutar

```bash
npm install
npm run migrate
npm test
npm start
```

Abrir http://localhost:3000. La migración se ejecuta **una vez** para poblar la base; repetirla es seguro (INSERT OR IGNORE). En posteriores arranques basta con `npm start`.

## Historias

- US1: `db/database.js` y `db/schema.sql` crean tablas products, categories, users, orders y order_items.
- US2: `db/migrate.js` migra los nueve productos del Sprint 2 (su origen original era JS, no JSON). `data/legacyProducts.js` es solo un respaldo para la migración y no participa en la ejecución normal.
- US3: `services/productsService.js` usa SQL para catálogo, detalle, categoría, búsqueda, relacionados y sugeridos.
- US4: carrito en sesión solo con IDs y cantidades; precio y stock se obtienen de SQLite.
- US5: IDs no numéricos → 400; IDs inexistentes → 404.
- US6: sin persistencia JSON ni acceso a archivos en servicios de negocio.
- US7: tabla users con campos requeridos; autenticación pendiente para Sprint 4.

## Notas

La base SQLite se genera localmente y no se incluye en el repositorio; hay que ejecutar `npm run migrate` después de instalar. Las sesiones usan el almacenamiento en memoria de express-session, adecuado solo para desarrollo. El checkout y registro siguen siendo demostrativos.
