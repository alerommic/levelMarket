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
    res.status(500).json({ error: "Error en el servodir servidor" });
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
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();

    //borra la imagen asociada
    
    await client.query('DELETE FROM images WHERE gameid = $1', [id]);

    // Borra el juego
    const result = await client.query(
      'DELETE FROM games WHERE gameid = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    return res.status(204).end();
  } catch (error) {
    console.error('Error al borrar el juego', error.message);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const { name, price, releasedate, genre, platform, stock, imageurl } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const updateRes = await client.query(
      `UPDATE games SET
        name = $1,
        price = $2,
        releasedate = $3,
        genre = $4,
        platform = $5,
        stock = $6
      WHERE gameid = $7
      RETURNING gameid, name, price, releasedate, genre, platform, stock`,
      [name, price, releasedate, genre, platform, stock, id]
    );
    if (updateRes.rows.length === 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    // Gestionar la imagen
    if (imageurl) {
      await client.query('DELETE FROM images WHERE gameid = $1', [id]);
      await client.query(
        `INSERT INTO images (gameid, imageurl) VALUES ($1, $2)`,
        [id, imageurl]
      );
    }
    await client.query('COMMIT');
    client.release();
    const updatedGame = updateRes.rows[0];
    updatedGame.imageurl = imageurl || null;
    res.json(updatedGame);
  } catch (error) {
    await client.query('ROLLBACK');
    client.release();
    console.error('Error al actualizar juego:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const createGame = async (req, res) => {
  const { name, price, releasedate, genre, platform, stock, imageurl } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // inserta el juego y devuelve sus datos
    const { rows } = await client.query(
      `INSERT INTO games
      (name, price, releasedate, genre, platform, stock)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING gameid, name, price, releasedate, genre, platform, stock`,
      [name, price, releasedate, genre, platform, stock]
    );
    const game = rows[0];

    // si recibe una url la guarda
    if (imageurl) {
      await client.query(
        `INSERT INTO images (gameid, imageurl)
        VALUES ($1, $2)`,
        [game.gameid, imageurl]
      );
      game.imageurl = imageurl;
    }

    await client.query('COMMIT');
    res.status(201).json(game);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear juego:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    client.release();
  }
};






module.exports = { getGameList, getGameById , deleteGame, updateGame, createGame};
