const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');
const SALT_ROUNDS = 10;

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await db.pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id, name, email, created_at', [name || null, email, hash]);
    const user = result.rows[0];
    await db.pool.query('INSERT INTO carts (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [user.id]);
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json({ user: req.session.user });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'email_exists' });
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const result = await db.pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'invalid_credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json({ user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'logout_failed' });
    res.clearCookie('victorem.sid');
    res.json({ ok: true });
  });
});

router.get('/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

router.get('/users', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  try {
    const result = await db.pool.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

module.exports = router;
