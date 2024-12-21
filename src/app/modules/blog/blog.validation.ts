import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export const updateBlogValidationSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  });
