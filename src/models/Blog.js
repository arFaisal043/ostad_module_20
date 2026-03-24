const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        trim: true
    }],
    blogImage: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
