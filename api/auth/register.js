import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function register(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
      }
      return res.status(400).json({ message: error.message });
    }

    // Retornamos el usuario sin la contraseña
    const userSafe = {
      id: data.user.id,
      email: data.user.email,
      createdAt: data.user.created_at,
      name: data.user.user_metadata?.name || name,
    };

    return res.status(201).json({ message: 'Registro exitoso', user: userSafe });

  } catch (error) {
    console.error('Error en register API:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}
