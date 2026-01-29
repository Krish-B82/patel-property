const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/register - Register new admin
router.post('/register', register);

// POST /api/auth/login - Login admin
router.post('/login', login);

// GET /api/auth/verify - Verify token (PROTECTED ROUTE)
router.get('/verify', authMiddleware, (req, res) => {
    // If we reach here, token is valid (authMiddleware passed)
    res.json({
        message: 'Token is valid',
        admin: {
            id: req.admin.id,
            email: req.admin.email
        }
    });
});

module.exports = router;