import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseId');

        if (!courseId) {
            return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
        }

        // Step 1: Fetch all student_id values from the ENROLLMENT table for the given course_id
        const enrollments = await prisma.eNROLLMENT.findMany({
            where: {
                course_id: parseInt(courseId),
            },
            select: {
                student_id: true, // Fetch only student_id
            },
        });

        const studentIds = enrollments.map((enrollment) => enrollment.student_id);

        if (studentIds.length === 0) {
            return NextResponse.json({ students: [] }, { status: 200 }); // No students enrolled
        }

        // Step 2: Fetch student details from the STUDENT table using the student_id values
        const students = await prisma.sTUDENT.findMany({
            where: {
                student_id: {
                    in: studentIds, // Filter by student_id array
                },
            },
            select: {
                student_id: true,
                student_name: true,
                student_email: true,
            },
        });

        return NextResponse.json({ students }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
