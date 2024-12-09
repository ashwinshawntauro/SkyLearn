import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    const tutorId = req.nextUrl.searchParams.get('tutorId'); 
    if (!tutorId) {
        return NextResponse.error({ error: 'tutorId is required' }, { status: 400 });
    }
    try {
        const getTutorCourses = await prisma.tEACHING.findMany({
            where: {
                tutor_id: parseInt(tutorId,10),
            },
            select: {
                course_id: true,
            },
        });
        if (getTutorCourses.length === 0) {
            return NextResponse.error({ error: 'No courses found for this tutor' }, { status: 200 });
        }
        const courseIds = getTutorCourses.map(course => course.course_id);
        const getCourse = await prisma.cOURSE.findMany({
            where: {
                course_id: { in: courseIds }, 
            },
            select: {
                course_id: true,
                course_name: true,
                course_description: true,
                course_price: true,
                course_duration: true,
                course_enrolments: true,
                difficulty: true,
                enrollment_deadline: true,
                googleClassroomId: true,
                googleClassroomJoinLink: true,
                youtube_link:true,
            },
        });
        if (getCourse && getCourse.length > 0) {
            return NextResponse.json(getCourse);
        } else {
            return NextResponse.error({ error: 'No courses found' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.error({ error: 'Internal Server Error' }, { status: 500 });
    }
}
