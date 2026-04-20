import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { Post, PostResponse } from '@/lib/models/Post';
import type { User } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db
      .collection<User>('users')
      .findOne({ username: session.user.email });

    if (!user?._id) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { content, image } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const post: Post = {
      authorId: user._id,
      authorUsername: user.username,
      authorAvatar: user.profile?.avatar || '🧑',
      content: content.trim(),
      image: image || undefined,
      likes: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Post>('posts').insertOne(post);

    const response: PostResponse = {
      ...post,
      _id: result.insertedId.toString(),
      authorId: user._id.toString(),
      likeCount: 0,
      commentCount: 0,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const session = await getServerSession(authOptions);

    const limit = Math.min(
      parseInt(request.nextUrl.searchParams.get('limit') || '20'),
      100
    );
    const skip = parseInt(request.nextUrl.searchParams.get('skip') || '0');

    const posts = await db
      .collection<Post>('posts')
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const userId = session?.user?.email
      ? (
          await db
            .collection<User>('users')
            .findOne({ username: session.user.email })
        )?._id
      : null;

    const response: PostResponse[] = posts.map((post) => ({
      ...post,
      _id: post._id?.toString() || '',
      authorId: post.authorId.toString(),
      likeCount: post.likes.length,
      commentCount: post.comments.length,
      isLikedByUser: userId
        ? post.likes.some((id) => id.toString() === userId.toString())
        : false,
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
