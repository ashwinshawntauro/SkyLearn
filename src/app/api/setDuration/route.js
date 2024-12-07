import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { duration, status, course_id, tutor_id } = await req.json();
    if (!duration || !status || !course_id || !tutor_id) {
        return NextResponse.json(
            { error: 'All fields (duration, status, course_id, tutor_id) are required' },
            { status: 400 }
        );
    }
    try {
        const setDuration = await prisma.livestreams.create({
            data: {
                duration: parseInt(duration),
                status: status,
                course_id: parseInt(course_id),
                tutor_id: parseInt(tutor_id),
            },
        });
        return NextResponse.json(setDuration, { status: 200 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
