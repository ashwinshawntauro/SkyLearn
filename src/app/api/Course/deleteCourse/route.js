import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req) {
    const { courseId } = await req.json();  
    try {
        const deletedCourse = await prisma.cOURSE.delete({
            where: {
                course_id: parseInt(courseId), 
            },
        });

        if (deletedCourse) {
            return NextResponse.json(deletedCourse);
        } else {
            return NextResponse.error(
                { error: 'Course not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}