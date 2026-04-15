const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// المسار هو: /api/auth/register
router.post('/register', registerUser);

// المسار هو: /api/auth/login
router.post('/login', authUser);

module.exports = router;
