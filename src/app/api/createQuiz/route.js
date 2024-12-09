import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { courseId, questions } = await req.json(); 

    // Input validation can be added back if required
    // if (!courseId || !Array.isArray(questions) || questions.length === 0) {
    //     return NextResponse.json(
    //         { message: 'Course ID and questions are required.' },
    //         { status: 400 }
    //     );
    // }

    try {
        // Array to store created questions
        const newQuestions = [];

        // Iterate over each question to check if it already exists
        for (const question of questions) {
            const { question_number, questionText, choice1, choice2, choice3, choice4, correctChoice } = question;

            // Check if the question already exists based on courseId and questionNumber
            const existingQuestion = await prisma.qUIZ.findUnique({
                where: {
                    course_id_question_number: {
                        course_id: parseInt(courseId),
                        question_number: question_number,
                    },
                },
            });

            if (existingQuestion) {
                // If the question exists, skip or update based on your needs
                console.log(`Question ${question_number} already exists in course ${courseId}`);
                continue; // Skip to the next question
            } else {
                // Create a new question if it doesn't exist
                const createdQuestion = await prisma.qUIZ.create({
                    data: {
                        course_id: parseInt(courseId),
                        question_number: question_number,
                        question_text: questionText,
                        choice_1: choice1,
                        choice_2: choice2,
                        choice_3: choice3,
                        choice_4: choice4,
                        correct_choice: parseInt(correctChoice),
                    },
                });

                newQuestions.push(createdQuestion); // Push the newly created question to the array
            }
        }

        // If any questions were created, return them
        if (newQuestions.length > 0) {
            return NextResponse.json(newQuestions, { status: 201 });
        } else {
            return NextResponse.json(
                { message: 'No new questions were created, they may already exist.' },
                { status: 200 }
            );
        }

    } catch (error) {
        console.error('Error creating quiz questions:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
