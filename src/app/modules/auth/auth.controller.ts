import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import catchAsync from '../../utils/catchAsync';
import { loginUser } from './auth.service';
import sendResponse from '../../utils/sendResponse';

export const loginController = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Email and password are required',
    );
  }

  //login user
  const result = await loginUser(email, password);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});
