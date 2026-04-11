const jwt = require('jsonwebtoken');

const optionalAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Not logged in or invalid header format, proceed as public user
            return next();
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            // No token, proceed as public user
            return next();
        }

        // Verify token securely
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach admin info if token is successfully validated
        req.admin = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        // If the token is invalid/expired, still let them read public property data, don't throw an error
        next();
    }
};

module.exports = optionalAuthMiddleware;
