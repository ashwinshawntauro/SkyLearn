import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const {courseId} = await req.json();
        const endCourse = await prisma.cOURSE.update({
            where: {
                course_id : courseId 
            },
            data: {
                status: 'ended',
            },
        });
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error updating livestream status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
