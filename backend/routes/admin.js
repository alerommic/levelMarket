const express = require('express');
const router  = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const { deleteGame, updateGame, createGame } = require('../controllers/gameController');

router.use(requireLogin);
router.use(requireAdmin);

router.delete('/gameDelete/:id', deleteGame);

router.put('/games/:id/edit', updateGame);

router.post('/games/new', createGame);

module.exports = router; 
