import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import UserModel from './user.model';
import { RegisterDTO } from './user.validation';
import { hashPassword } from './user.utils';

export const registerUser = async (data: RegisterDTO) => {
  const { name, email, password } = data;

  //check if the user already exists
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  //hash the password
  const hashedPassword = await hashPassword(password);

  //create user
  const newUser = new UserModel({ name, email, password: hashedPassword });

  await newUser.save();

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};
