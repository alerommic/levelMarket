const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const gamesRoutes = require('./routes/games');

app.use(cors());
app.use(express.json());

app.use('/', gamesRoutes); // Monta rutas como /GameList

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});