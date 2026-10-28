# Mi Ecommerce — Sprint 5

API REST JSON sobre el proyecto Sprint 4, conservando las vistas EJS y WebSockets.

## Ejecución

```bash
npm install
npm run migrate
npm start
```

Abrir http://localhost:3000 para la tienda o http://localhost:3000/api/stats para la API.

## Endpoints

- `GET /api/products`, `GET /api/products/:id`
- `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- `GET /api/categories`, `GET /api/categories/:id`
- `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- `GET /api/stats`

Ejemplo para crear una categoría:

```bash
curl -X POST http://localhost:3000/api/categories -H 'Content-Type: application/json' -d '{"name":"Accesorios"}'
```

Ejemplo para crear un producto (sustituir category_id por un ID válido):

```bash
curl -X POST http://localhost:3000/api/products -H 'Content-Type: application/json' -d '{"name":"Producto nuevo","category_id":1,"price":2500,"stock":5}'
```

`price` es entero no negativo, consistente con el esquema SQLite existente. PUT acepta campos parciales. CORS habilitado. Las respuestas de la API son JSON, incluso para errores.

**Nota:** esta API académica no implementa autenticación ni autorización; no exponer los endpoints de escritura a Internet sin protegerlos. La eliminación de categorías/productos referenciados por otras tablas puede fallar con 400 por integridad referencial.

## Entrega

La cátedra solicita repositorio Git personal. No incluir `node_modules`, archivos `.sqlite` ni secretos.
