const express = require('express');
const router  = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const { deleteGame, updateGame, createGame } = require('../controllers/gameController');
const { getUserList, deleteUser } = require('../controllers/userController')

router.use(requireLogin);
router.use(requireAdmin);

router.delete('/gameDelete/:id', deleteGame);

router.put('/games/:id/edit', updateGame);

router.post('/games/new', createGame);

//rutas de usuarios

router.get('/userList', getUserList);

router.delete('/userDelete/:id', deleteUser)

module.exports = router; 
