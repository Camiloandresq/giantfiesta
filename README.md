# Giant Fiesta - E-commerce

Tienda de juegos de madera premium con integración de Mercado Pago.

## Estructura del Proyecto

```
├── src/                    # Frontend React + TypeScript
├── server.js               # Backend Express + Mercado Pago
├── package.json            # Dependencias
└── public/images/          # Imágenes estáticas
```

## Despliegue Frontend (Estático)

```bash
npm install
npm run build
# Desplegar carpeta 'dist' en cualquier hosting estático
```

## Despliegue Backend (Railway/Render)

### Variables de Entorno Requeridas:
- `MP_ACCESS_TOKEN` - Token de Mercado Pago
- `FRONTEND_URL` - URL del frontend desplegado
- `PORT` - Puerto (Railway lo asigna automáticamente)

### Comando de inicio:
```bash
node server.js
```

## Endpoints API

- `POST /api/create-preference` - Crear preferencia de pago
- `POST /api/webhook` - Webhook de Mercado Pago
- `GET /api/payment/:id` - Verificar estado de pago
