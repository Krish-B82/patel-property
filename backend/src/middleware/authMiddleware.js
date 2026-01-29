const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided. Access denied.' });
        }

        // Check if it's in format: "Bearer <token>"
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid token format. Use: Bearer <token>' });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach admin info to request
        req.admin = {
            id: decoded.id,
            email: decoded.email
        };

        // Continue to next middleware/route
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired. Please login again.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token. Access denied.' });
        }

        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authMiddleware;