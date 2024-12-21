import express from 'express';
import { blockUserController, deleteBlogController } from './admin.controller';
import { authenticateAdmin } from '../../middlewares/auth';

const router = express.Router();

router.patch('/users/:userId/block', authenticateAdmin, blockUserController);

router.delete('/blogs/:id', authenticateAdmin, deleteBlogController);


export const adminRoutes = router;
