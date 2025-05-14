const express = require('express');
const router = express.Router();
const { register, login, logout ,getMe } = require('../controllers/authController');

// Registro
router.post('/signup', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

//autenticacion
router.get('/me', getMe);

module.exports = router;