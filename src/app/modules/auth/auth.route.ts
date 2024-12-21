import { registerController } from '../user/user.controller';
import { loginController } from './auth.controller';
import express from 'express';

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

export const authRoutes = router;
