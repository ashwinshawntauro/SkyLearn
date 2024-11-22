import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const student_id = searchParams.get('student_id'); // Extract student_id from query params

        if (!student_id) {
            return NextResponse.json({ error: 'student_id is required' }, { status: 400 });
        }

        const getEnroll = await prisma.eNROLLMENT.findMany({
            where: {
                student_id: parseInt(student_id,10),
            },
            select: {
                student_id: true,
                course_id: true,
            },
        });

        return NextResponse.json({ getEnroll }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
