import { ObjectId } from 'mongodb';

export interface Comment {
  _id?: ObjectId;
  postId: ObjectId;
  authorId: ObjectId;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
}

export interface CommentResponse extends Omit<Comment, '_id' | 'postId' | 'authorId'> {
  _id: string;
  postId: string;
  authorId: string;
}
