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
const PORT = process.env.PORT || 6543;

// =======================================================
// 1. CONFIGURACIÓN INICIAL Y SEGURIDAD (Se ejecuta primero)
// =======================================================

// A. Confiar en el proxy: NECESARIO en plataformas como Railway
app.set('trust proxy', 1);

// B. Configuración de CORS con la URL de Vercel y credenciales (Cookies)
const corsOptions = {
    // Usamos la variable FRONTEND_URL configurada en Railway
    origin: process.env.FRONTEND_URL,
    credentials: true
};
app.use(cors(corsOptions));

// Middlewares estándar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// =======================================================
// 2. INICIO DE DB Y SESIÓN (Se ejecuta después)
// =======================================================

(async () => {
    try {
        await db.init();
        const pgPool = db.pool;

        // Configuración ÚNICA de Sesión con las propiedades de seguridad
        app.use(session({
            store: new PgSession({ pool: pgPool }),
            name: 'victorem.sid',
            secret: process.env.SESSION_SECRET || 'change-me-in-prod',
            
            // CORREGIDO: Propiedades OBLIGATORIAS para evitar fallos/cierre (SIGTERM)
            resave: false,
            saveUninitialized: false, 
            
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
                
                // OBLIGATORIO: Cookies seguras para Railway (HTTPS)
                secure: process.env.NODE_ENV === 'production' ? true : false,
                
                // OBLIGATORIO: Permite el envío de cookies entre Vercel y Railway
                sameSite: 'none' 
            }
        }));

        // =======================================================
        // 3. RUTAS Y SERVIDOR
        // =======================================================

        if (authRoutes) app.use('/api/auth', authRoutes);
        if (ordersRoutes) app.use('/api/orders', ordersRoutes);

        // Serve static frontend from parent directory (esto no es necesario si Vercel sirve el frontend)
        // Pero lo mantenemos si el backend necesita servir archivos estáticos internos
        const staticPath = path.join(__dirname, '..');
        app.use(express.static(staticPath));

        // Fallback (solo si el frontend se sirve desde el backend, pero mantenemos por compatibilidad)
        app.get('*', (req, res, next) => {
            if (req.path.startsWith('/api/')) return next();
            res.sendFile(path.join(staticPath, 'index.html'));
        });

        // CORREGIDO: Escuchar en 0.0.0.0 para compatibilidad total con Railway
        app.listen(PORT, '0.0.0.0', () => console.log(`Backend listening on http://0.0.0.0:${PORT}`));
        
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
})();

