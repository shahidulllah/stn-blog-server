import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import UserModel from '../user/user.model';
import { comparePassword, generateToken } from './auth.utils';

const loginUser = async (email: string, password: string) => {
  //check if the user exists
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found');
  }

  //check if the password is correct
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(StatusCodes.NOT_FOUND, 'The password is not correct');
  }

  //check if the user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  //generate a jwt token
  const token = generateToken(user._id.toString(), user.role);

  return { token };
};
