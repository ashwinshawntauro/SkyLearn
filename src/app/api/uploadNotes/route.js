import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { courseId, noteTitle, noteText } = await req.json();

    // Input validation
    if (!courseId || !noteTitle || !noteText) {
        return NextResponse.json(
            { message: 'All fields are required: courseId, noteTitle, noteText.' },
            { status: 400 }
        );
    }

    try {
        // Create a new note entry in the database
        const newNote = await prisma.nOTES.create({
            data: {
                course_id: parseInt(courseId), // Ensure courseId is stored as an integer
                note_title: noteTitle,
                note_text: noteText,
            },
        });

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error('Error uploading note:', error);

        // Prisma-specific error handling (optional)
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Duplicate note detected.' },
                { status: 409 } // Conflict status
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    try {
        // Fetch notes based on the courseId if provided
        const notes = courseId
            ? await prisma.nOTES.findMany({
                where: { course_id: parseInt(courseId) },
            })
            : await prisma.nOTES.findMany();

        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
