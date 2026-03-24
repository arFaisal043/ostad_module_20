const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found. Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
