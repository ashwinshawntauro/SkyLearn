import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Parse userId from the query parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
        }

        // Ensure the userId is valid (numeric, etc.)
        const userIdInt = parseInt(userId, 10);
        if (isNaN(userIdInt)) {
            return NextResponse.json({ error: 'Invalid userId parameter' }, { status: 400 });
        }

        // Query the enrolments and join with courses to get only the registered courses for the user
        const registeredCourses = await prisma.eNROLLMENT.findMany({
            where: {
                student_id: userIdInt,  // Filter by the userId
            },
            select: {
                course_completion: true, // Fetch the course_completion field from enrollments
                COURSE: {  // Include related course data
                    select: {
                        course_id: true,
                        course_name: true,
                        course_description: true,
                        course_price: true,
                        course_duration: true,
                        difficulty: true,
                        enrollment_deadline: true,
                    }
                }
            }
        });

        // Check if the user has enrolled in any courses
        if (registeredCourses.length > 0) {
            // Combine course data with the completion information
            return NextResponse.json(
                registeredCourses.map(r => ({
                    ...r.COURSE, 
                    course_completion: r.course_completion // Add course_completion to the course data
                }))
            );
        }

        return NextResponse.json({ error: 'No registered courses found' }, { status: 404 });

    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
