import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

export const createBlog = async (
  title: string,
  content: string,
  author: string,
): Promise<TBlog> => {
  const newBlog = await BlogModel.create({ title, content, author });

  return newBlog;
};
