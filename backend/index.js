require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const cors = require('cors');

const db = require('./db');
let ordersRoutes, authRoutes;
try { ordersRoutes = require('./routes/orders'); } catch (e) { ordersRoutes = null; }
try { authRoutes = require('./routes/auth'); } catch (e) { authRoutes = null; }

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

(async () => {
  try {
    await db.init();
    const pgPool = db.pool;

    app.use(session({
      store: new PgSession({ pool: pgPool }),
      name: 'victorem.sid',
      secret: process.env.SESSION_SECRET || 'change-me-in-prod',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      }
    }));

  if (authRoutes) app.use('/api/auth', authRoutes);
  if (ordersRoutes) app.use('/api/orders', ordersRoutes);

    // Serve static frontend from parent directory
    const staticPath = path.join(__dirname, '..');
    app.use(express.static(staticPath));

    // Fallback to index.html for client pages
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(staticPath, 'index.html'));
    });

    app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();


// ============== 1. CONFIGURACIÓN DE PROXY Y CORS ==============

// 1A. Confiar en el proxy: NECESARIO en plataformas como Railway
// Esto permite que Express sepa que la conexión es HTTPS (segura)
app.set('trust proxy', 1); // <--- DEBE SER 1

// 1B. Configuración de CORS
// Reemplaza <TU_FRONTEND_URL> con tu URL de Vercel (victor-g5w4xavs4-...)
const corsOptions = {
    // Usamos la variable de entorno que ya configuramos en Railway
    origin: process.env.FRONTEND_URL, 
    // ESTO es crucial para permitir el intercambio de cookies de sesión
    credentials: true 
};
app.use(cors(corsOptions));


// ============== 2. CONFIGURACIÓN DE SESIÓN (COOKIES) ==============

app.use(session({
    // ... otras opciones de sesión ...
    
    cookie: {
        // secure: true - OBLIGATORIO cuando se usa HTTPS (Railway lo hace).
        // Usamos NODE_ENV para que en desarrollo no falle:
        secure: process.env.NODE_ENV === 'production' ? true : false,
        
        // sameSite: 'none' - OBLIGATORIO para peticiones entre diferentes dominios (Vercel -> Railway)
        sameSite: 'none', 
        
        // ... otras propiedades de cookie (ej. maxAge)
    }
}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    // NECESITAS ESTOS DOS PARA SILENCIAR EL ERROR:
    resave: false, 
    saveUninitialized: false, 
    
    // Y la configuración de seguridad OBLIGATORIA:
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', 
        // ...
    },
}));
