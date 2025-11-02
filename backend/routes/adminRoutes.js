import express from 'express';
import * as adminController from '../controllers/adminController.js';
import requireAuth from '../middleware/authMiddleware.js';
import requireAdmin from '../middleware/adminMiddleware.js';  // Import the requireAdmin middleware

const router = express.Router();
// router.get('/panel',requireAuth, requireAdmin, adminController.adminPanel);

// Admin Panel (Dashboard) - Only accessible by admin users
router.get('/adminpanel', requireAuth, requireAdmin, adminController.adminPanel);

// View User's Blogs - Admin only
router.get('/users/:id/blogs', requireAuth, requireAdmin, adminController.viewUserBlogs);

// Delete a Blog - Admin only
router.get('/blogs/:id/delete', requireAuth, requireAdmin, adminController.handleDeleteBlog);

// Delete a User - Admin only
router.get('/users/:id/delete', requireAuth, requireAdmin, adminController.handleDeleteUser);

export default router;
