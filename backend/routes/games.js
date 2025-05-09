const express = require('express');
const router = express.Router();
const { getGameList } = require('../controllers/gameController');

// Ruta exacta: /GameList
router.get('/GameList', getGameList);

module.exports = router;