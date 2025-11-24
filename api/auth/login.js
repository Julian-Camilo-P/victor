import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Devuelve datos básicos del usuario
    const userSafe = {
      id: data.user.id,
      email: data.user.email,
      createdAt: data.user.created_at,
    };

    return res.status(200).json({ message: 'Inicio de sesión exitoso', user: userSafe });

  } catch (error) {
    console.error('Error en login API:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}
