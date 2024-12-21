import { registerController } from "./user.controller";
import express from 'express';

const router = express.Router();

router.post(
  '/register',registerController,
);

export const userRoutes = router;