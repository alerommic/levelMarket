module.exports = function requireAdmin(req, res, next) {
  const user = req.session.user;
  if (user && user.is_admin) {
    return next();
  }
  return res.status(403).json({ error: 'permisos insuficientes' });
};
