import { ObjectId } from 'mongodb';

export interface Post {
  _id?: ObjectId;
  authorId: ObjectId;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: ObjectId[];
  comments: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostResponse extends Omit<Post, '_id' | 'authorId'> {
  _id: string;
  authorId: string;
  likeCount: number;
  commentCount: number;
  isLikedByUser?: boolean;
}
