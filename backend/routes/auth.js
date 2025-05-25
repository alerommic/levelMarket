const express = require('express');
const router = express.Router();
const { register, login, logout ,getMe } = require('../controllers/authController');
const { updateUser } = require('../controllers/userController')
const requireLogin = require('../middlewares/requireLogin')

// Registro
router.post('/signup', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

//autenticacion
router.get('/me', requireLogin, getMe);

//editar usuario (el mismo)

router.put('/updateUser', requireLogin, updateUser);

module.exports = router;