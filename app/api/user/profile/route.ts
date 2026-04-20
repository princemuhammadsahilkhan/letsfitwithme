import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth-utils';
import { getToken } from 'next-auth/jwt';
import type { User } from '@/lib/models/User';
import { ObjectId } from 'mongodb';

/**
 * GET /api/user/profile
 * Get current user's profile
 */
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token?.sub) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const user = await db
      .collection<User>('users')
      .findOne({ _id: new ObjectId(token.sub) });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      username: user.username,
      profile: user.profile,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/profile
 * Update user's profile
 */
export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token?.sub) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bio, fitnessGoal, avatar } = await request.json();

    const { db } = await connectToDatabase();
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(token.sub) },
      {
        $set: {
          'profile.bio': bio || '',
          'profile.fitnessGoal': fitnessGoal || '',
          'profile.avatar': avatar || '',
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
