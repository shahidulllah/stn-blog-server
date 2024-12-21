import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import UserModel from '../user/user.model';

export const blockUser = async (userId: string) => {
  //update the isBlocked property to true
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};
