const express = require('express');
const router = express.Router();
const db = require('../db');

function ensureAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'not_authenticated' });
  next();
}

// Create order from payload (items + total) - useful when frontend sends items directly
router.post('/', ensureAuth, async (req, res) => {
  const userId = req.session.user.id;
  const { items, total } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'invalid_items' });
  try {
    const orderRes = await db.pool.query('INSERT INTO orders (user_id, total, status) VALUES ($1,$2,$3) RETURNING id, created_at', [userId, total || 0, 'paid']);
    const order = orderRes.rows[0];
    for (const it of items) {
      await db.pool.query('INSERT INTO order_items (order_id, product_id, name, image, price, quantity) VALUES ($1,$2,$3,$4,$5,$6)', [order.id, it.product_id || null, it.name, it.image || null, it.price || 0, it.quantity || 1]);
    }
    // Optionally clear cart in DB
    await db.pool.query('DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)', [userId]);
    res.json({ orderId: order.id, created_at: order.created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

// List orders for current user
router.get('/', ensureAuth, async (req, res) => {
  const userId = req.session.user.id;
  try {
    const ordersRes = await db.pool.query('SELECT id, total, status, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    const orders = [];
    for (const row of ordersRes.rows) {
      const itemsRes = await db.pool.query('SELECT product_id, name, image, price, quantity FROM order_items WHERE order_id = $1', [row.id]);
      orders.push({ id: row.id, total: row.total, status: row.status, created_at: row.created_at, items: itemsRes.rows });
    }
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Cancel order
router.post('/:id/cancel', ensureAuth, async (req, res) => {
  const userId = req.session.user.id;
  const orderId = req.params.id;
  try {
    const orderRes = await db.pool.query('SELECT id, status, user_id FROM orders WHERE id = $1', [orderId]);
    const order = orderRes.rows[0];
    if (!order) return res.status(404).json({ error: 'not_found' });
    if (order.user_id !== userId) return res.status(403).json({ error: 'forbidden' });
    if (order.status === 'cancelled') return res.status(400).json({ error: 'already_cancelled' });
    // Simple business rule: allow cancellation only if status is 'paid' (or 'pending')
    if (order.status !== 'paid' && order.status !== 'pending') return res.status(400).json({ error: 'cannot_cancel' });
    await db.pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['cancelled', orderId]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

module.exports = router;
