import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Parse the query parameter from the URL
        const { searchParams } = new URL(req.url);
        const userCourse = searchParams.get('courseId');

        // Ensure courseId is provided and valid
        if (!userCourse) {
            return NextResponse.json({ error: 'Missing parameter: courseId' }, { status: 400 });
        }

        const courseIdInt = parseInt(userCourse, 10);

        if (isNaN(courseIdInt)) {
            return NextResponse.json({ error: 'Invalid courseId parameter' }, { status: 400 });
        }

        // Query the database using Prisma
        const questions = await prisma.qUIZ.findMany({
            where: { course_id: courseIdInt }, // Assuming `course_id` links quiz questions
            select: {
                question_id: true,
                question_number: true,
                question_text: true,
                choice_1: true,
                choice_2: true,
                choice_3: true,
                choice_4: true,
                correct_choice: true,
            },
        });

        // If no questions are found, return an error
        if (questions.length === 0) {
            return NextResponse.json({ error: 'No questions found for this course' }, { status: 404 });
        }

        // Return the questions as a JSON response
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
