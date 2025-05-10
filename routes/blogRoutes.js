import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import * as blogController from '../controllers/blogController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// --------- BLOG ROUTES ---------

// Route to get all blogs for logged-in user (dashboard)
router.get('/', requireAuth, blogController.getBlogList);

// Route to get the user's own blogs
router.get('/myblogs', requireAuth, blogController.getMyBlogs);

// Route to create a new blog post
router.get('/create', requireAuth, blogController.getCreateBlog);
router.post('/create', requireAuth, upload.single('image'), blogController.postCreateBlog);

// Route to view a specific blog post
router.get('/:id', requireAuth, blogController.viewBlog);

// Route to edit a specific blog post
router.get('/:id/edit', requireAuth, blogController.getEditBlog);
router.post('/:id/edit', requireAuth, upload.single('image'), blogController.postEditBlog);

// React to a blog post
router.post('/:id/react', requireAuth, blogController.reactToBlog);

// Get current like/dislike counts (AJAX)
router.get('/:id/reactions', blogController.getReactions);

// Route to delete a blog post
router.get('/:id/delete', requireAuth, blogController.handleDeleteBlog);

export default router;
