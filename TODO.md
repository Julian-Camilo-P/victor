# Migración de Frontend a APIs del Backend

## Archivos a Modificar
- [x] main.js: Cambiar login, register, checkAuthStatus, logout para usar /api/auth/*
- [ ] miperfil.js: Actualizar funciones de usuario para usar APIs
- [ ] historia.js: Cambiar auth para usar APIs
- [ ] contacto.js: Cambiar auth para usar APIs
- [ ] catalogo.js: Cambiar auth para usar APIs
- [ ] personalizacion.js: Cambiar auth para usar APIs
- [ ] checkout.js: Verificar si necesita cambios

## Notas
- Usar fetch con credentials: 'include' para enviar cookies de sesión
- Reemplazar localStorage.getItem('currentUser') con llamadas a /api/auth/me
- Mantener localStorage para carrito y pedidos por ahora
- Probar registro y verificar en Supabase después de cambios
