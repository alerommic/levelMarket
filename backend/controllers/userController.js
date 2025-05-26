const pool = require('../db');

const getUserList = async (req, res) => {
  try {
    const client = await pool.connect();

    const query = `
      SELECT userid, username, email, fullname, address, is_admin
      FROM users 
    `;
    const result = await client.query(query);

    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener la lista de juegos:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log('DELETE /admin/userDelete, id=', id);
  try {
    const client = await pool.connect();

    // Borra el usuario
    const result = await client.query(
      'DELETE FROM users WHERE userid = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'usuario no encontrado' });
    }
    return res.status(204).end();
  } catch (error) {
    console.error('Error al borrar el usuario', error.message);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const updateUser = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: 'No autorizado' });

  const { username, email, fullname, address } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users
        SET username=$1, email=$2, fullname=$3, address=$4
        WHERE userid=$5
        RETURNING userid, username, email, fullname, address, is_admin`,
      [username, email, fullname, address, user.id]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


module.exports = { getUserList, deleteUser, updateUser };