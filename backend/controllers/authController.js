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

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insertar el usuario
    const insertQ = `
      INSERT INTO users (username, password, email, fullname, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING userid, username, email, fullname, address, is_admin;
    `;
    const result = await pool.query(insertQ, [
      username, hashedPassword, email, fullName, address
    ]);
    // Responder sin la contraseña
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Busca el usuario
    const { rows } = await pool.query(
      'SELECT userid, username, password, is_admin FROM users WHERE username=$1',
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales no válidas' });
    }
    const user = rows[0];

    // Compara el hash de la contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales no válidas' });
    }

    // Guarda en sesión
    req.session.user = {
      id:       user.userid,
      username: user.username,
      is_admin: user.is_admin
    };

    // Devuelve el objeto de usuario para el frontend
    return res.json({ user: req.session.user });
  } catch (err) {
    console.error('Error en el login:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'No se pudo cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout correcto' });
  });

  
};

const getMe = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const userId = req.session.user.id;
  try {
    const { rows } = await pool.query(
      `SELECT 
        userid,
        username,
        email,
        fullname,
        address,
        is_admin
      FROM users
      WHERE userid = $1`,
      [userId]
    );
    if (!rows[0]) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ user: rows[0] });
  } catch (err) {
    console.error('Error en /me:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = { register, login, logout, getMe };
