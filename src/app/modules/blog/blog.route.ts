import express from 'express';
import { createBlogController, updateBlogController } from './blog.controller';
import { authMiddleware } from '../../middlewares/auth';


const router = express.Router();

router.post('/', authMiddleware, createBlogController);

router.patch('/:id', authMiddleware, updateBlogController);

export const blogRoutes = router;