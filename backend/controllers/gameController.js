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
    res.status(500).json({ error: "Error interno en el servodir servidor" });
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT g.*, i.imageurl
      FROM games g
      LEFT JOIN images i ON g.gameid = i.gameid
      WHERE g.gameid = $1`,
      [id]
    );
    client.release();
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = { getGameList, getGameById };
