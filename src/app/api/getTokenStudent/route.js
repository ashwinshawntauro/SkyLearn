import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseids');
        const studId = searchParams.get('userId');
        const livestreamId = searchParams.get('livestreamId');

        if (!courseId || !studId || !livestreamId) {
            return NextResponse.json(
                { status: 400, message: 'Missing required query parameters.' },
                { status: 400 }
            );
        }

        const count = await prisma.user_tokens.findFirst({
            where: {
                user_id: parseInt(studId, 10),
                course_id: parseInt(courseId, 10),
                livestream_id: parseInt(livestreamId, 10),
            },
        });

        if (!count) {
            return NextResponse.json(
                { status: 404, message: 'No token found for the given parameters.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { status: 200, data: count },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching token count:', error);
        return NextResponse.json(
            { status: 500, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
