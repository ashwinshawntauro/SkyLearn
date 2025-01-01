import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Get the courseId from the query parameters
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseId');

        if (!courseId) {
            return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
        }

        // Fetch the course by courseId
        const course = await prisma.cOURSE.findUnique({
            where: {
                course_id: parseInt(courseId, 10),
            },
            select: {
                status: true, // Only fetch the status of the course
            },
        });

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ isEnded: course.status === 'ended' });
    } catch (error) {
        console.error('Error fetching course status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
