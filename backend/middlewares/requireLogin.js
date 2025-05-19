module.exports = function requireLogin(req, res, next) {
  const user = req.session.user;
  if (req.session && user) {
    // El usuario esta autenticado
    return next();
  }
  // No hay sesion
  res.status(401).json({ error: 'Debes iniciar sesión para acceder' });
};
