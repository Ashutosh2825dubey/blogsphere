const express = require('express');
const blogController = require('../controller/blogcontroller');
const { requireAuth,checkUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Static routes
router.get('/about', blogController.blog_about);
router.get('/contact', blogController.blog_contact);

// Blog routes
router.get('/', blogController.blog_index);

router.get('/blogs/create', requireAuth, blogController.blog_create_get);
router.post('/blogs/create', blogController.blog_create_post);
router.delete('/blogs/:id', requireAuth, blogController.blog_delete);
router.get('/blogs/:id', requireAuth, blogController.blog_details);

module.exports = router;
