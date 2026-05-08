export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Error Interno del Servidor';
  res.status(status).json({ error: message });
}
