import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { Comment, CommentResponse } from '@/lib/models/Comment';
import { Post } from '@/lib/models/Post';
import type { User } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const postId = new ObjectId(id);

    const comments = await db
      .collection<Comment>('comments')
      .find({ postId })
      .sort({ createdAt: -1 })
      .toArray();

    const response: CommentResponse[] = comments.map((comment) => ({
      ...comment,
      _id: comment._id?.toString() || '',
      postId: comment.postId.toString(),
      authorId: comment.authorId.toString(),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { db } = await connectToDatabase();

    const user = await db
      .collection<User>('users')
      .findOne({ username: session.user.email });

    if (!user?._id) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const postId = new ObjectId(id);
    const post = await db.collection<Post>('posts').findOne({ _id: postId });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const comment: Comment = {
      postId,
      authorId: user._id,
      authorUsername: user.username,
      authorAvatar: user.profile?.avatar || '🧑',
      content: content.trim(),
      createdAt: new Date(),
    };

    const result = await db
      .collection<Comment>('comments')
      .insertOne(comment);

    // Add comment ID to post's comments array
    await db.collection<Post>('posts').updateOne(
      { _id: postId },
      { $push: { comments: result.insertedId }, $set: { updatedAt: new Date() } }
    );

    const response: CommentResponse = {
      ...comment,
      _id: result.insertedId.toString(),
      postId: postId.toString(),
      authorId: user._id.toString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
