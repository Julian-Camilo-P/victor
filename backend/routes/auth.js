const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
// Importamos el objeto db que contiene el pool de conexiones
const db = require('../db'); 
const SALT_ROUNDS = 10;

/**
 * Endpoint de Registro
 * * Inserta un nuevo usuario en la tabla 'users' después de hashear la contraseña.
 * Crea un carrito (cart) asociado al nuevo usuario.
 */
router.post('/register', async (req, res) => {
  // Log de depuración: muestra en los logs de Railway qué datos está recibiendo el servidor
  console.log("Datos de registro recibidos:", req.body);
  
  const { name, email, password } = req.body;
  
  // Validación básica
  if (!email || !password) {
    // Código 400: Solicitud incorrecta
    return res.status(400).json({ error: 'email and password required' });
  }

  try {
    // 1. Hashear la contraseña
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    
    // 2. Insertar el nuevo usuario
    const insertUserQuery = `
      INSERT INTO users (name, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email
    `;
    
    const result = await db.pool.query(insertUserQuery, [name || null, email, hash]);
    const user = result.rows[0];
    
    // 3. Crear un carrito asociado al nuevo usuario
    // La tabla carts tiene la columna user_id, lo cual es correcto.
    await db.pool.query('INSERT INTO carts (user_id) VALUES ($1)', [user.id]);
    
    // 4. Iniciar la sesión del usuario
    req.session.user = { id: user.id, name: user.name, email: user.email };
    
    // 5. Respuesta exitosa (200 OK)
    res.json({ user: req.session.user });
    
  } catch (err) {
    // Log de depuración: Muestra el error completo en Railway
    console.error("Error al registrar usuario:", err); 
    
    // Si el código de error 23505 es por UNIQUE constraint (email ya existe)
    if (err.code === '23505') {
      return res.status(409).json({ error: 'email_exists' });
    }
    
    // Para cualquier otro error (incluyendo fallos de columna/SQL)
    res.status(500).json({ error: 'internal_error' });
  }
});

/**
 * Endpoint de Login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const result = await db.pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'invalid_credentials' });
    
    // Compara el hash
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
    
    // Inicia la sesión
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json({ user: req.session.user });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: 'internal_error' });
  }
});

/**
 * Endpoint de Logout
 */
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ error: 'logout_failed' });
    }
    // Limpia la cookie de sesión del cliente
    res.clearCookie('victorem.sid');
    res.json({ ok: true });
  });
});

/**
 * Endpoint para obtener el usuario actual
 */
router.get('/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

module.exports = router;
