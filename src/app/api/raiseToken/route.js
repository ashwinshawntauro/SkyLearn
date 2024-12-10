import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const secretKey = 'a'; // Use a secure secret key

export async function POST(req) {
  const { userId, livestreamId, courseids } = await req.json();

  if (!userId || !livestreamId || !courseids) {
    return NextResponse.json(
      { error: 'userId, livestreamId, and courseids are required' },
      { status: 400 }
    );
  }

  try {
    // Generate a consistent token
    const payload = { courseids, livestreamId };
    const token = jwt.sign(payload, secretKey, { noTimestamp: true }); // noTimestamp removes iat

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save the token to the database
    await prisma.user_tokens.create({
      data: {
        user_id: userId,
        token: token,
        course_id: courseids,
        expires_at: expiresAt,
      },
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
