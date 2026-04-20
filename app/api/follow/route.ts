import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { Follow } from '@/lib/models/Follow';
import type { User } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const currentUser = await db
      .collection<User>('users')
      .findOne({ username: session.user.email });

    if (!currentUser?._id) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (currentUser._id.toString() === userId) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      );
    }

    const targetUserId = new ObjectId(userId);
    const targetUser = await db
      .collection<User>('users')
      .findOne({ _id: targetUserId });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      );
    }

    const existingFollow = await db
      .collection<Follow>('follows')
      .findOne({
        followerId: currentUser._id,
        followingId: targetUserId,
      });

    if (existingFollow) {
      // Unfollow
      await db.collection<Follow>('follows').deleteOne({
        followerId: currentUser._id,
        followingId: targetUserId,
      });
      return NextResponse.json({ following: false });
    } else {
      // Follow
      await db.collection<Follow>('follows').insertOne({
        followerId: currentUser._id,
        followingId: targetUserId,
        createdAt: new Date(),
      });
      return NextResponse.json({ following: true });
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
    return NextResponse.json(
      { error: 'Failed to toggle follow' },
      { status: 500 }
    );
  }
}
