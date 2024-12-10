import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = 'a'; // Replace with your actual secret key

export async function POST(req) {
  try {
    const { courseId, livestreamId } = await req.json();
    if (!courseId || !livestreamId) {
      return NextResponse.json(
        { error: 'courseId and livestreamId are required' },
        { status: 400 }
      );
    }
    const payload = { courseId, livestreamId };
    const token = jwt.sign(payload, secretKey, { noTimestamp: true });
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
