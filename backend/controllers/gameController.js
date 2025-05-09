const pool = require('../db');

const getGameList = async (req, res) => {
  try {
    const client = await pool.connect();

    const query = `
      SELECT g.*, i.imageurl
      FROM games g
      LEFT JOIN images i ON g.gameid = i.gameid
    `;
    const result = await client.query(query);

    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener la lista de juegos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { getGameList };
