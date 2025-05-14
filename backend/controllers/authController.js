const pool   = require('../db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password, email, fullName, address } = req.body;
  try {
    // evita que se cree un usuario si esta repetido el correo o la contraseña
    const { rows } = await pool.query(
      'SELECT userid FROM users WHERE username=$1 OR email=$2',
      [username, email]
    );
    if (rows.length) {
      return res.status(409).json({ error: 'Usuario o email ya registrados' });
    }

    // 2) Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // 3) Insertar el usuario
    const insertQ = `
      INSERT INTO users (username, password, email, fullname, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING userid, username, email, fullname, address, is_admin;
    `;
    const result = await pool.query(insertQ, [
      username, hashedPassword, email, fullName, address
    ]);
    // 4) Responder sin la contraseña
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // busca el nombre del usuario
    const { rows } = await pool.query(
      'SELECT userid, username, password, is_admin FROM users WHERE username=$1',
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'credenciales no validas' });
    }
    const user = rows[0];
    // Comparar el hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'credenciales no validas' });
    }
    // guarda la sesion
    req.session.user = {
      id:       user.userid,
      username: user.username,
      is_admin: user.is_admin
    };
    res.json({ message: 'Login exitoso' });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'No se pudo cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout correcto' });
  });

  
};

const getMe = (req, res) => {
  if (req.session.user) {
    // Devuelve la info del usuario
    return res.json({ loggedIn: true, user: req.session.user });
  }
  // Si no hay sesión activa
  return res.status(401).json({ loggedIn: false });
};

module.exports = { register, login, logout, getMe };
