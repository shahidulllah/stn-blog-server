import { Document, ObjectId } from 'mongoose';

export interface TBlog extends Document {
  title: string;
  content: string;
  author: ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
