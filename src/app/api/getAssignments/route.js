import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);  // Access the query parameters from the URL
    const courseId = searchParams.get('courseId'); // Get the 'courseId' from the query

    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    try {
        const assignments = await prisma.aSSIGNMENT.findMany({
            where: {
                course_id: parseInt(courseId), // Make sure to convert courseId to an integer if needed
            }
        });
        
        return NextResponse.json(assignments, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
    }
}
