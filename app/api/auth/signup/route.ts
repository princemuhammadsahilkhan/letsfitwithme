import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { generateUsername, generateRandomPassword, hashPassword } from '@/lib/auth-utils';
import type { User } from '@/lib/models/User';

/**
 * POST /api/auth/signup
 * Generates a new anonymous user with random credentials
 */
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();

    // Generate unique username
    let username = generateUsername();
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure username is unique
    while (attempts < maxAttempts) {
      const existingUser = await db.collection('users').findOne({ username });
      if (!existingUser) {
        break;
      }
      username = generateUsername();
      attempts++;
    }

    if (attempts === maxAttempts) {
      return NextResponse.json(
        { error: 'Failed to generate unique username' },
        { status: 500 }
      );
    }

    // Generate random password
    const password = generateRandomPassword();
    const hashedPassword = await hashPassword(password);

    // Create user in database
    const newUser: User = {
      username,
      hashedPassword,
      createdAt: new Date(),
      profile: {},
    };

    await db.collection('users').insertOne(newUser);

    return NextResponse.json(
      {
        username,
        password,
        message: 'Save these credentials — we cannot recover them if lost',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
