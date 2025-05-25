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

module.exports = { getUserOrderList };
