import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const JWT_SECRET = config.jwt_access_secret;

if (!JWT_SECRET) {
  throw new AppError(StatusCodes.FORBIDDEN, "'Unauthorized access");
}

export const authMiddleware = catchAsync((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Unauthorized access');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

  req.user = { id: decoded.userId };

  next();
});
