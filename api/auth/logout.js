import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function logout(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ message: 'Error al cerrar sesión' });
    }

    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error en logout API:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}
