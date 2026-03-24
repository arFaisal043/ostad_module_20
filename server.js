const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');

const userRoutes = require('./src/routes/userRoutes');
const blogRoutes = require('./src/routes/blogRoutes');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', // Set to your frontend URL in production
    credentials: true
}));
app.use(cookieParser()); // Cookie parser

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('Blog Management API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
