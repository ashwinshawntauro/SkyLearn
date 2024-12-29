import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req) {
    const { studentId, courseId, Score } = await req.json();

    if (!courseId || !studentId) {
        return NextResponse.json({message:"Invalid courseId or studentId"}, { status: 400 });
    }

    try {
        // Check the current marksStatus
        const leaderboardEntry = await prisma.lEADERBOARD.findUnique({
            where: {
                course_id_student_id: { 
                    course_id: parseInt(courseId),
                    student_id: parseInt(studentId),
                },
            },
            select: { marksStatus: true },  // Only fetch marksStatus field
        });

        if (leaderboardEntry && leaderboardEntry.marksStatus === 'Graded') {
            return NextResponse.json({message:'This assignment is already graded.'}, { status: 400 });
        }

        // Proceed with the update if the status is not "Graded"
        const updatedCourse = await prisma.lEADERBOARD.update({
            where: {
                course_id_student_id: { 
                    course_id: parseInt(courseId),
                    student_id: parseInt(studentId),
                },
            },
            data: {
                score: {
                    increment: parseInt(Score) || 0,
                },
                marksStatus: 'Graded',
            },
        });

        return NextResponse.json(updatedCourse);

    } catch (error) {
        console.error('Error updating course with classroom details:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
