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
  const { userid } = req.params;
    const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Borra los detalles de pedido
    await client.query(
      `DELETE FROM orderdetails 
        WHERE orderid IN (
          SELECT orderid FROM orders WHERE userid = $1
        )`,
      [userid]
    );

    // Borra los pedidos
    await client.query(
      `DELETE FROM orders WHERE userid = $1`,
      [userid]
    );

    // Borra el usuario
    const delUser = await client.query(
      `DELETE FROM users WHERE userid = $1 RETURNING *`,
      [userid]
    );

    if (delUser.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await client.query('COMMIT');
    return res.sendStatus(204);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al borrar el usuario:', err);
    return res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    client.release();
  }
};

const deleteSelfUser = async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) return res.status(401).json({ error: 'No autenticado' });
  req.params.userid = sessionUser.id;
  const { userid } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Borra los detalles de pedido
    await client.query(
      `DELETE FROM orderdetails 
        WHERE orderid IN (
          SELECT orderid FROM orders WHERE userid = $1
        )`,
      [userid]
    );

    // Borra los pedidos
    await client.query(
      `DELETE FROM orders WHERE userid = $1`,
      [userid]
    );

    // Borra el usuario
    const delUser = await client.query(
      `DELETE FROM users WHERE userid = $1 RETURNING *`,
      [userid]
    );

    if (delUser.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await client.query('COMMIT');
    return res.sendStatus(204);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al borrar el usuario:', err);
    return res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    client.release();
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


module.exports = { getUserList, deleteUser, updateUser, deleteSelfUser };