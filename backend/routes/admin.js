const express = require('express');
const router  = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');


router.use(requireLogin);
router.use(requireAdmin);

module.exports = router; 
