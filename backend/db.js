const { Pool } = require('pg');
require('dotenv').config();
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const pool = postgres(connectionString);

async function init() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        UNIQUE (user_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
        product_id TEXT,
        name TEXT,
        image TEXT,
        price INTEGER,
        quantity INTEGER DEFAULT 1
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        total INTEGER,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id TEXT,
        name TEXT,
        image TEXT,
        price INTEGER,
        quantity INTEGER DEFAULT 1
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL,
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT session_pkey PRIMARY KEY ("sid")
      );
    `);

    await client.query(`CREATE INDEX IF NOT EXISTS session_expire_idx ON "session" ("expire");`);

    await client.query('COMMIT');
    console.log('Database initialized');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('DB init error', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, init };
