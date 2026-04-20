import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { Post } from '@/lib/models/Post';
import type { User } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

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

    const userLiked = post.likes.some((id) => id.toString() === user._id.toString());

    if (userLiked) {
      await db.collection<Post>('posts').updateOne(
        { _id: postId },
        { $pull: { likes: user._id }, $set: { updatedAt: new Date() } }
      );
    } else {
      await db.collection<Post>('posts').updateOne(
        { _id: postId },
        { $push: { likes: user._id }, $set: { updatedAt: new Date() } }
      );
    }

    const updatedPost = await db.collection<Post>('posts').findOne({ _id: postId });

    return NextResponse.json({
      liked: !userLiked,
      likeCount: updatedPost?.likes.length || 0,
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
