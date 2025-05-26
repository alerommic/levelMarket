const express = require('express');
const router  = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const { deleteGame, updateGame, createGame } = require('../controllers/gameController');
const { getUserList, deleteUser } = require('../controllers/userController')
const { getOrderList, updateOrderStatus, deleteOrder } = require('../controllers/orderController')

router.use(requireLogin);
router.use(requireAdmin);

router.delete('/gameDelete/:id', deleteGame);

router.put('/games/:id/edit', updateGame);

router.post('/games/new', createGame);

//rutas de usuarios

router.get('/userList', getUserList);

router.delete('/userDelete/:id', deleteUser)

//rutas de pedidos

router.get('/orders', getOrderList)

router.put('/orders/:orderId/status', updateOrderStatus);

router.delete('/orders/:orderId', deleteOrder)

module.exports = router;
