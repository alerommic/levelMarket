const express = require('express');
const router  = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { checkout } = require('../controllers/checkoutController');

router.post('/checkout', requireLogin, checkout);

module.exports = router;
