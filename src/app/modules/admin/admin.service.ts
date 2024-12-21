import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import UserModel from '../user/user.model';
import { BlogModel } from '../blog/blog.model';

//Admin block user
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

//admin delete user
export const deleteBlog = async (blogId: string) => {
    // Find and delete the blog by ID
    const blog = await BlogModel.findByIdAndDelete(blogId);
  
    if (!blog) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
    }
  
    return blog;
  };

  //Admin get all users
  export const getAllUsers = async() => {
    const users = await UserModel.find({}, '-password');

    return users
  }
