import express from 'express';
import { createBlogController, deleteBlogController, updateBlogController } from './blog.controller';
import { authMiddleware } from '../../middlewares/auth';


const router = express.Router();

router.post('/', authMiddleware, createBlogController);

router.patch('/:id', authMiddleware, updateBlogController);

router.delete('/:id', authMiddleware, deleteBlogController);

export const blogRoutes = router;