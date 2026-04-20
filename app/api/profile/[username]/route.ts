import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { Follow } from '@/lib/models/Follow';
import type { User } from '@/lib/models/User';
import { Post } from '@/lib/models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const { db } = await connectToDatabase();
    const session = await getServerSession(authOptions);

    const user = await db.collection<User>('users').findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentUser = session?.user?.email
      ? await db.collection<User>('users').findOne({ username: session.user.email })
      : null;

    const [followerCount, followingCount, postCount] = await Promise.all([
      db.collection<Follow>('follows').countDocuments({ followingId: user._id }),
      db.collection<Follow>('follows').countDocuments({ followerId: user._id }),
      db.collection<Post>('posts').countDocuments({ authorId: user._id }),
    ]);

    const isFollowing = currentUser
      ? await db.collection<Follow>('follows').findOne({
          followerId: currentUser._id,
          followingId: user._id,
        })
      : null;

    return NextResponse.json({
      _id: user._id.toString(),
      username: user.username,
      avatar: user.profile?.avatar || '🧑',
      bio: user.profile?.bio || '',
      fitnessGoal: user.profile?.fitnessGoal || '',
      createdAt: user.createdAt,
      followerCount,
      followingCount,
      postCount,
      isFollowing: !!isFollowing,
      isOwnProfile: currentUser?._id.toString() === user._id.toString(),
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
