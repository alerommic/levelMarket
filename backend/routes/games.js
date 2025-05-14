const express = require('express');
const router = express.Router();
const { getGameList, getGameById } = require('../controllers/gameController');

// Ruta exacta: /GameList
router.get('/GameList', getGameList);
router.get('/GameList/:id', getGameById);
module.exports = router;