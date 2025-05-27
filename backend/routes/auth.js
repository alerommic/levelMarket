const express = require('express');
const router = express.Router();
const { register, login, logout ,getMe, changePassword } = require('../controllers/authController');
const { updateUser, deleteSelfUser } = require('../controllers/userController');
const requireLogin = require('../middlewares/requireLogin');

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

router.put('/profile/password', requireLogin, changePassword);

router.delete('/profile/deleteMe', requireLogin, deleteSelfUser);

module.exports = router;