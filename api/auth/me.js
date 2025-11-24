import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function me(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ user: null });
    }

    const userSafe = {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      name: user.user_metadata?.name || null,
    };

    return res.status(200).json({ user: userSafe });
  } catch (error) {
    console.error('Error en me API:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}
