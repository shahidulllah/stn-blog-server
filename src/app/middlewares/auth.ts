import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import UserModel from '../modules/user/user.model';
import { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = config.jwt_access_secret;

if (!JWT_SECRET) {
  throw new AppError(StatusCodes.UNAUTHORIZED, "'Unauthorized access");
}

export const authMiddleware = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized access');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

  req.user = { id: decoded.userId };

  next();
});

//Authenticate admin
export const authenticateAdmin = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Authorization token missing');
  }

  //Verify
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { id: string };

  const user = await UserModel.findById(decoded.userId);

  if (!user || user.role !== 'admin') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Access denied');
  }

  next();
});
