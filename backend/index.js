const express = require("express");
const cors = require("cors");
const app = express();
const {Pool} = require("pg");
require('dotenv').config()

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

app.get('/GameList', async (req, res) => {
  try {
    const client = await pool.connect();

    //consulta SQL para obtener juegos con imágenes
    const query = `
      SELECT g.*, i.imageurl
      FROM games g
      LEFT JOIN images i ON g.gameid = i.gameid
    `;
    const result = await client.query(query);

    client.release(); // Liberar la conexión 

    res.json(result.rows); // Enviar los resultados como JSON
  } catch (error) {
    console.error('Error al obtener la lista de juegos:', error.message);
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
