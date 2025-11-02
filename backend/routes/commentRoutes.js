import express from 'express';
import requireAuth from '../middleware/authMiddleware.js';
import pool from '../models/db.js';

const router = express.Router();

// Add a comment
router.post('/:blogId', requireAuth, async (req, res) => {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        await pool.query(
            'INSERT INTO comments (blog_id, user_id, content) VALUES ($1, $2, $3)',
            [blogId, userId, content]
        );
        res.redirect(`/blogs/${blogId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to add comment');
    }
});

export default router