const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')
const { getUserOrderList } = require('../controllers/orderController')

router.get('/orders',requireLogin, getUserOrderList);

module.exports = router;