const Blog = require('../models/Blog');

// @desc    Create a blog
// @route   POST /api/blogs
exports.createBlog = async (req, res) => {
    try {
        const { title, content, authorName, tags, blogImage } = req.body;

        const blog = new Blog({
            title,
            content,
            authorName,
            tags: tags || [],
            blogImage,
            creator: req.user._id
        });

        const createdBlog = await blog.save();
        res.status(201).json({ success: true, message: 'Blog created successfully', blog: createdBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('creator', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get a single blog
// @route   GET /api/blogs/:id
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('creator', 'name email');
        if (blog) {
            res.json({ success: true, blog });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Checking if the user who requested is the creator of the blog
        if (blog.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You do not have permission to update this blog' });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.authorName = req.body.authorName || blog.authorName;
        blog.tags = req.body.tags || blog.tags;
        blog.blogImage = req.body.blogImage || blog.blogImage;

        const updatedBlog = await blog.save();
        res.json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Checking if the user who requested is the creator of the blog
        if (blog.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You do not have permission to delete this blog' });
        }

        await blog.deleteOne();
        res.json({ success: true, message: 'Blog removed' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
