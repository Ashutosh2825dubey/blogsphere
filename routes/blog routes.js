const express = require('express');
const blogController = require('../controllers/blogcontroller');
const router = express.Router();

// Static routes first
router.get('/about', blogController.blog_about);
router.get('/contact', blogController.blog_contact);

// Blog routes
router.get('/blogs', blogController.blog_index);
router.post('/blogs', blogController.blog_create_post);
router.get('/blogs/create', blogController.blog_create_get);
router.delete('/blogs/:id', blogController.blog_delete);
router.get('/blogs/:id', blogController.blog_details);

module.exports = router;
