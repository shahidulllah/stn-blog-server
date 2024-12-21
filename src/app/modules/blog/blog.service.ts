import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

export const createBlog = async (
  title: string,
  content: string,
  author: string,
): Promise<TBlog> => {
  const newBlog = (await BlogModel.create({ title, content, author })).populate(
    'author',
  );

  return newBlog;
};

export const updateBlog = async (
  blogId: string,
  userId: string,
  updateData: Partial<TBlog>,
): Promise<TBlog | null> => {
  const blog = await BlogModel.findOne({ _id: blogId, author: userId });

  if (!blog) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Blog not found or you are not the author',
    );
  }

  Object.assign(blog, updateData);
  await blog.save();

  return blog;
};
