import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { FetchBlogsOptions, TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

//Create blog
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

//Update blog
export const updateBlog = async (
  blogId: string,
  userId: string,
  updateData: Partial<TBlog>,
): Promise<TBlog | null> => {
  const blog = await BlogModel.findOne({ _id: blogId, author: userId });

  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Blog not found or you are not the author',
    );
  }

  Object.assign(blog, updateData);
  await blog.save();

  return blog;
};

//Delete blog
export const deleteBlog = async (
  blogId: string,
  userId: string,
): Promise<void> => {
  const blog = await BlogModel.findOne({ _id: blogId, author: userId });

  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Blog not found or you are not the author',
    );
  }

  await BlogModel.deleteOne({ _id: blogId });
};

//Get all blogs
export const fetchBlogs = async (options: FetchBlogsOptions) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = options;

  //Query builder
  const query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  if (filter) {
    query.author = filter;
  }

  //Sorthing
  const sortOptions: any = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

  //fetch blogs
  return BlogModel.find(query)
    .populate('author', 'name email')
    .sort(sortOptions);
};
