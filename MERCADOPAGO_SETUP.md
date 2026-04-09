# Configuración de Mercado Pago - Giantfiesta

## 🚀 Tu tienda está en línea

**URL del sitio:** https://l2dtun7vu6z7e.ok.kimi.link

---

## 💳 Integración con Mercado Pago

El carrito de compra está completamente funcional con integración a Mercado Pago. Para que los pagos funcionen en producción, necesitas configurar tus credenciales.

### Paso 1: Crear cuenta en Mercado Pago

1. Ve a https://www.mercadopago.cl
2. Crea una cuenta de vendedor (si no tienes una)
3. Accede al panel de desarrolladores: https://www.mercadopago.cl/developers

### Paso 2: Obtener credenciales

1. En el panel de desarrolladores, ve a "Credenciales"
2. Copia tu **Access Token** (para producción) o usa las de Sandbox para pruebas
3. Las credenciales de Sandbox comienzan con `TEST-`
4. Las credenciales de producción comienzan con `APP_USR-`

### Paso 3: Configurar el servidor

Edita el archivo `.env` en la raíz del proyecto:

```env
# Mercado Pago Configuration
MP_ACCESS_TOKEN=TU_ACCESS_TOKEN_AQUI
```

### Paso 4: Reiniciar el servidor

```bash
npm start
```

---

## 🧪 Modo Sandbox (Pruebas)

Para probar sin usar dinero real, usa las credenciales de Sandbox:

### Tarjetas de prueba (Sandbox)

| Tarjeta | Número | Código | Fecha |
|---------|--------|--------|-------|
| Mastercard | 5031 7557 3453 0604 | 123 | 11/30 |
| Visa | 4509 9535 6623 3704 | 123 | 11/30 |
| American Express | 3711 803032 57522 | 1234 | 11/30 |

### Usuarios de prueba

Puedes crear usuarios de prueba desde el panel de desarrolladores de Mercado Pago.

---

## 📁 Estructura del proyecto

```
/mnt/okcomputer/output/app/
├── dist/                    # Frontend compilado
├── server.js                # Servidor Express con Mercado Pago
├── .env                     # Variables de entorno
├── src/
│   ├── components/
│   │   ├── Cart.tsx         # Carrito de compra
│   │   └── CheckoutModal.tsx # Modal de checkout
│   ├── pages/
│   │   ├── PaymentSuccess.tsx   # Página de éxito
│   │   ├── PaymentFailed.tsx    # Página de error
│   │   └── PaymentPending.tsx   # Página de pendiente
│   └── services/
│       └── payment.ts       # Servicio de pagos
```

---

## 🔧 Endpoints de la API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/create-preference` | POST | Crea una preferencia de pago |
| `/api/payment/:id` | GET | Obtiene información de un pago |
| `/api/webhook` | POST | Recibe notificaciones de MP |
| `/api/health` | GET | Verifica estado del servidor |

---

## 📝 Flujo de pago

1. Usuario agrega productos al carrito
2. Hace clic en "Finalizar compra"
3. Completa sus datos en el modal
4. Es redirigido a Mercado Pago
5. Completa el pago en el sitio seguro de MP
6. Retorna a la página de éxito/error/pendiente
7. Recibe confirmación por correo

---

## ⚠️ Notas importantes

- **Sandbox**: Usa credenciales que empiecen con `TEST-` para pruebas
- **Producción**: Cambia a credenciales `APP_USR-` para pagos reales
- **Webhooks**: Configura la URL de webhook en el panel de MP para recibir notificaciones
- **SSL**: En producción, el sitio debe usar HTTPS para que los pagos funcionen correctamente

---

## 🆘 Soporte

Si tienes problemas con la integración:

1. Documentación oficial: https://www.mercadopago.cl/developers
2. Foro de desarrolladores: https://github.com/mercadopago
3. Contacto Giantfiesta: contacto@giantfiesta.cl
