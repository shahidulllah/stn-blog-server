import express from 'express';
import { blockUserController } from './admin.controller';
import { authenticateAdmin } from '../../middlewares/auth';

const router = express.Router();

router.patch('/users/:userId/block', authenticateAdmin, blockUserController);


export const adminRoutes = router;
