import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();
        const { studentId, credits } = body;

        if (!studentId || !credits) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const student = await prisma.sTUDENT.findUnique({
            where: { student_id: parseInt(studentId, 10) },
            select: { points: true },
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        if (student.points < credits) {
            return NextResponse.json({ error: 'Insufficient points' }, { status: 400 });
        }

        const updatedStudent = await prisma.sTUDENT.update({
            where: { student_id: parseInt(studentId, 10) },
            data: {
                points: student.points - credits,
            },
        });

        return NextResponse.json({
            success: true,
            newPoints: updatedStudent.points,
        });
    } catch (error) {
        console.error('Error decrementing points:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
