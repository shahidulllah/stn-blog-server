import express from 'express';
import { createBlogController } from './blog.controller';
import { authMiddleware } from '../../middlewares/auth';


const router = express.Router();

router.post('/', authMiddleware, createBlogController);

export const blogRoutes = router;