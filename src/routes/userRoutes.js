const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
