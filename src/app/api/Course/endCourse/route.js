import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { courseId } = await req.json();

        // End the course
        const endCourse = await prisma.cOURSE.update({
            where: {
                course_id: courseId,
            },
            data: {
                status: 'ended',
            },
        });

        // Fetch the top 3 students based on percentage_score for the course
        const topStudents = await prisma.lEADERBOARD.findMany({
            where: {
                course_id: parseInt(courseId,10),
            },
            orderBy: { percentage_score: "desc" }, // Sort by score in descending order
            include: {
                STUDENT: { // Include related Student data
                    select: {
                        student_id:true,
                        points: true, // Fetch only student_name
                    },
                },
            },
            take: 3, // Get top 3 students


            // where: {
            //     course_id: courseId,
            // },
            // orderBy: {
            //     percentage_score: 'desc', // Sort by percentage_score in descending order
            // },
            // take: 3, // Get top 3 students
        });

        // Update points for the top 3 students
        const updates = topStudents.map(async (student) => {
            const pointsToAdd = Math.floor(student.percentage_score * 0.1); // 10% of percentage_score
            await prisma.sTUDENT.update({
                where: { student_id :student.student_id},
                data: {
                    points: {
                        increment: pointsToAdd, // Increment the points field
                    },
                },
            });
        });

        await Promise.all(updates); // Execute all updates concurrently

        return NextResponse.json({ status: 200, message: 'Course ended and points updated for top students.' });
    } catch (error) {
        console.error('Error updating course and awarding points:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
