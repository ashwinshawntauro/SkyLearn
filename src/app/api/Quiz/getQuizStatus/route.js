import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  // Use req.nextUrl.searchParams to access query parameters
  const courseId = req.nextUrl.searchParams.get('courseId');
  const userId = req.nextUrl.searchParams.get('userId');

  if (!courseId || !userId) {
    return NextResponse.json({ error: 'Missing courseId or userId' }, { status: 400 });
  }

  try {
    // Check if the user has already attempted the quiz
    const submission = await prisma.qUIZ_RESULTS.findFirst({
      where: {
        course_id: Number(courseId), // Convert to number if the database expects it
        user_id: Number(userId),     // Convert to number if the database expects it
      },
    });

    if (submission) {
      return NextResponse.json({
        quiz_attempted: true,
        message: "You have already completed this quiz.",
      });
    } else {
      return NextResponse.json({
        quiz_attempted: false,
        message: "You have not attempted this quiz yet.",
      });
    }
  } catch (error) {
    console.error('Error checking quiz status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
