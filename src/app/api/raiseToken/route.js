import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use environment variable for security

export async function POST(req) {
    const { userId, livestreamId,courseids } = await req.json();

    if (!userId || !livestreamId) {
        return NextResponse.json(
            { error: 'userId and livestreamId are required' },
            { status: 400 }
        );
    }

    try {
        const token = jwt.sign(
            { courseids, livestreamId },
            secretKey,
            { expiresIn: '1h' }
        );

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 

        await prisma.user_tokens.create({
            data: {
                user_id:userId,
                token:token,
                course_id: courseids,
                expires_at:expiresAt,
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
