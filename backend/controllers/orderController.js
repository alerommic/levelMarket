const pool = require('../db');

const getUserOrderList = async (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.status(401).json({ error: 'No autorizado' });

  try {
    const client = await pool.connect();
    const query = `
      SELECT 
        o.orderid,
        o.orderdate,
        o.totalamount,
        o.status,
        json_agg(
          json_build_object(
            'gameid', g.gameid,
            'name', g.name,
            'quantity', od.quantity
          )
        ) AS items
      FROM orders o
      JOIN orderdetails od ON o.orderid = od.orderid
      JOIN games g ON od.gameid = g.gameid
      WHERE o.userid = $1
      GROUP BY o.orderid
      ORDER BY o.orderdate DESC;
    `;
    const { rows } = await client.query(query, [userId]);
    client.release();
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener la lista de pedidos:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const getOrderList = async (req, res) => {
  try {
    const client = await pool.connect();

    const query = `
      SELECT orderid, orderdate, totalamount, status
      FROM orders
      ORDER BY orderdate DESC;
    `;
    const result = await client.query(query);

    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener la lista de pedidos:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status }    = req.body; // 'completed'
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Cambia estado
    const upd = await client.query(
      `UPDATE orders SET status=$1 WHERE orderid=$2 RETURNING userid`,
      [status, orderId]
    );
    if (!upd.rows.length) {
      throw new Error('Pedido no encontrado');
    }
    // Si se completa, reduce el stock de los juegos
    if (status === 'Completed') {
      await client.query(`
        UPDATE games
        SET stock = stock - od.quantity
        FROM orderdetails od
        WHERE od.gameid = games.gameid
          AND od.orderid = $1
      `, [orderId]);
    }
    await client.query('COMMIT');
    res.json({ orderId, status });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const client = await pool.connect();
  try {
    // Primero borra detalles 
    await client.query('DELETE FROM orderdetails WHERE orderid = $1', [orderId]);
    // Luego borra el pedido
    const result = await client.query(
      'DELETE FROM orders WHERE orderid = $1 RETURNING *',
      [orderId]
    );
    client.release();
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.status(204).end();
  } catch (err) {
    client.release();
    console.error('Error borrando pedido:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};



module.exports = { getUserOrderList, getOrderList, updateOrderStatus, deleteOrder }
