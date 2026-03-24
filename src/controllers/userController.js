const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
};

// @desc    Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            phoneNumber
        });

        if (user) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                }
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            const token = generateToken(user._id);

            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({
                success: true,
                message: 'Logged in successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

            // Allow email change optionally
            if (req.body.email) {
                user.email = req.body.email;
            }

            // Allow password change optionally
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                success: true,
                message: 'Profile updated successfully',
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phoneNumber: updatedUser.phoneNumber
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
exports.logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ success: true, message: 'Logged out successfully' });
};
