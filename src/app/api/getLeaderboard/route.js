import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const course_id = searchParams.get('course_id'); // Extract student_id from query params

        if (!course_id) {
            return NextResponse.json({ error: 'course_id is required' }, { status: 400 });
        }

        const leaderboardInfo  = await prisma.lEADERBOARD.findMany({
            where: {
                course_id: parseInt(course_id,10),
            },
            orderBy: { score: "desc" }, // Sort by score in descending order
            include: {
                STUDENT: { // Include related Student data
                    select: {
                        student_name: true, // Fetch only student_name
                    },
                },
            },
        });

        return NextResponse.json({ leaderboardInfo  }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
