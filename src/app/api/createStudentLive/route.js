import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { studentId, courseId, liveId } = await req.json();
    try {
        const createStudentLive = await prisma.sTUDENTCLASSES.create({
            data: {
                student_id:studentId,
                course_id: parseInt(courseId),
                livestreaming_id: parseInt(liveId),
            },
        });
        return NextResponse.json(createStudentLive, { status: 200 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
