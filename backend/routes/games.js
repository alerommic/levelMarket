const express = require('express');
const router = express.Router();
const { getGameList, getGameById } = require('../controllers/gameController');

router.get('/GameList', getGameList);

router.get('/GameList/:id', getGameById);

module.exports = router;