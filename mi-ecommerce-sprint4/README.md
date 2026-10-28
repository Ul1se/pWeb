# PuntosClub — Sprint 4 (WebSockets)

Implementa las 9 User Stories de la consigna: servidor `ws`, indicador de conexión, contador y carrito en tiempo real, sincronización de pestañas de la misma sesión, mensajes `{type,payload}`, notificación de carrito vacío, reconexión automática y servicio centralizado.

## Ejecutar

```bash
npm install
npm run migrate
npm test
npm start
```

Abrí `http://localhost:3000` en dos pestañas del **mismo navegador**. Modificá el carrito y observá la sincronización sin refrescar.

**Nota:** las sesiones de Express se almacenan en memoria, adecuado para el ejercicio pero no para producción. El login y registro siguen siendo prototipos del Sprint 3; el Sprint 4 se enfoca exclusivamente en WebSockets.

## Pruebas manuales

1. Abrir dos pestañas: ambas muestran `Conectado`.
2. Agregar un producto en una pestaña: el contador se actualiza en ambas.
3. Modificar cantidad o vaciar carrito: se actualizan cantidades y totales en ambas pestañas.
4. Vaciar carrito: aparece notificación temporal.
5. Detener y reiniciar servidor: estado cambia a `Desconectado` y se reconecta automáticamente.

## Entrega

Subir el proyecto a un repositorio Git personal; no subir `node_modules`, archivos `.sqlite` ni secretos.
