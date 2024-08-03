const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Please enter an Title']
    },
    snippet: {
        type: String,
        required: [true,'Please enter an Snippet']
    },
    body: {
        type: String,
        required: [true,'Please enter an Body']
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
