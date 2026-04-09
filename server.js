import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de Mercado Pago - PRODUCCIÓN
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-2611701418644307-102923-2e68f33a3e67a0c317e393343b2d04d0-2688756152'
});

// Crear preferencia de pago
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer } = req.body;

    const preference = new Preference(client);
    
    const preferenceData = {
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        picture_url: item.picture_url,
        category_id: 'games',
        quantity: item.quantity,
        currency_id: 'CLP',
        unit_price: item.unit_price
      })),
      payer: {
        name: payer?.name || '',
        email: payer?.email || '',
        phone: {
          number: payer?.phone || ''
        }
      },
      back_urls: {
        success: `${req.headers.origin}/pago-exitoso`,
        failure: `${req.headers.origin}/pago-fallido`,
        pending: `${req.headers.origin}/pago-pendiente`
      },
      auto_return: 'approved',
      notification_url: `${req.protocol}://${req.get('host')}/api/webhook`,
      statement_descriptor: 'GIANT FIESTA',
      external_reference: `ORDER-${Date.now()}`,
    };

    const response = await preference.create({ body: preferenceData });

    res.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({ 
      error: 'Error al crear la preferencia de pago',
      details: error.message 
    });
  }
});

// Webhook para recibir notificaciones de Mercado Pago
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log('Webhook received:', { type, data });
    
    // Procesar notificación de pago
    if (type === 'payment') {
      const paymentId = data.id;
      console.log(`Payment notification received: ${paymentId}`);
      // Aquí puedes enviar email de confirmación, actualizar base de datos, etc.
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

// Verificar estado de pago
app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const payment = new Payment(client);
    
    const paymentData = await payment.get({ id: req.params.paymentId });
    
    res.json(paymentData);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'Error al obtener información del pago' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Giant Fiesta Payment API' });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Giant Fiesta Server running on port ${PORT}`);
  console.log(`💳 Mercado Pago PRODUCCIÓN integrado`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📁 Serving static files from dist`);
  }
});
