import { initDb, getDb } from '../lib/db.js';

async function seed() {
  const db = await initDb();
  
  await db.run('DELETE FROM tickets');
  
  const tickets = [
    { title: 'Login no funciona', description: 'Los usuarios no pueden iniciar sesión con su email', status: 'in_progress' },
    { title: 'Dashboard cargando lentamente', description: 'El dashboard tarda 5+ segundos en cargar', status: 'pending' },
    { title: 'Reparar página de perfil', description: 'La foto de perfil no se sube correctamente', status: 'pending' },
    { title: 'Timeout de conexión a BD', description: 'Errores ocasionales de timeout en reportes', status: 'in_progress' },
    { title: 'Email de notificaciones no se envía', description: 'Los usuarios no reciben emails de notificación', status: 'pending' },
    { title: 'Exportación a PDF rota', description: 'La función de exportar PDF devuelve error 500', status: 'pending' },
    { title: 'Limitador de rate en API', description: 'Implementar rate limiting en endpoints de API', status: 'completed' },
    { title: 'Actualizar documentación', description: 'Docs de API necesitan actualización para v2', status: 'pending' },
    { title: 'Reparar responsividad en mobile', description: 'UI mobile tiene problemas de layout en iPhone 12', status: 'in_progress' },
    { title: 'Renovar certificado SSL', description: 'Renovar certificado SSL antes de su expiración', status: 'completed' },
    { title: 'Optimizar búsqueda de usuarios', description: 'Performance de búsqueda se degrada con más usuarios', status: 'pending' },
    { title: 'Implementar dark mode', description: 'Agregar toggle de tema oscuro en configuración', status: 'pending' },
    { title: 'Reparar memory leaks', description: 'Worker en background consume demasiada memoria', status: 'in_progress' },
    { title: 'Autenticación de dos factores', description: 'Configurar 2FA para cuentas de admin', status: 'pending' },
    { title: 'Automatizar backups', description: 'Configurar backups automáticos diarios', status: 'completed' },
    { title: 'Actualizar librería de gráficos', description: 'Actualizar librería de gráficos a última versión', status: 'pending' }
  ];
  
  for (const ticket of tickets) {
    await db.run(
      'INSERT INTO tickets (title, description, status, created_at) VALUES (?, ?, ?, datetime("now", "-" || ? || " hours"))',
      [ticket.title, ticket.description, ticket.status, Math.floor(Math.random() * 200)]
    );
  }
  
  await db.close();
  console.log('✓ Base de datos inicializada con 16 tickets');
}

seed().catch(err => {
  console.error('Error en seed:', err);
  process.exit(1);
});
