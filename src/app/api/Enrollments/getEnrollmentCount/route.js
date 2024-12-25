import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Parse courseId from the query parameters
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseId');
        
        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId parameter' }, { status: 400 });
        }

        // Ensure the courseId is valid (numeric, etc.)
        const courseIdInt = parseInt(courseId, 10);
        if (isNaN(courseIdInt)) {
            return NextResponse.json({ error: 'Invalid courseId parameter' }, { status: 400 });
        }

        // Count the number of enrollments for the given course
        const enrollmentCount = await prisma.eNROLLMENT.count({
            where: {
                course_id: courseIdInt,
            },
        });

        return NextResponse.json({ courseId: courseIdInt, enrolledStudents: enrollmentCount });
    } catch (error) {
        console.error('Error fetching enrollment count:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
