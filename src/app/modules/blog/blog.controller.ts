import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import catchAsync from '../../utils/catchAsync';
import {
  createBlogValidationSchema,
  updateBlogValidationSchema,
} from './blog.validation';
import { createBlog, updateBlog } from './blog.service';
import sendResponse from '../../utils/sendResponse';

export const createBlogController = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Unauthorized access');
  }

  const { title, content } = req.body;

  //validate request data
  const validation = createBlogValidationSchema.safeParse({ title, content });

  if (!validation) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Validation Error');
  }

  //create blog
  const newBlog = await createBlog(title, content, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: newBlog,
  });
});

export const updateBlogController = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized access');
  }

  const { id: blogId } = req.params;
  const { title, content } = req.body;

  //validate request data
  const validation = updateBlogValidationSchema.safeParse({ title, content });

  if (!validation.success) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error');
  }

  //update the blog
  const updatedBlog = await updateBlog(blogId, userId, validation.data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});
