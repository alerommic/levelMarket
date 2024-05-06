const express = require('express');
const router = express.Router();
const { pool } = require('../db.js'); // Importa la configuración de la base de datos desde db.js

router.get('/GameList', async (req, res) => {
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
    console.error('Error al obtener la lista de juegos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;