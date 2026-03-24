const express = require('express');
const router = express.Router();
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

// All blog routes are protected based on requirements
router.route('/')
    .post(authMiddleware, createBlog)
    .get(authMiddleware, getBlogs);

router.route('/:id')
    .get(authMiddleware, getBlogById)
    .put(authMiddleware, updateBlog)
    .delete(authMiddleware, deleteBlog);

module.exports = router;
