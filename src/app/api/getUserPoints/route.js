import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Parse courseId and studentId from query parameters
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get('studentId');

        if (!studentId) {
            return NextResponse.json({ error: 'Missing studentId parameter' }, { status: 400 });
        }

        const student = await prisma.sTUDENT.findUnique({
            where: { student_id: parseInt(studentId, 10) },
            select: { points: true },
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ points: student.points });
    } catch (error) {
        console.error('Error fetching student points:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
