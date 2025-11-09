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
