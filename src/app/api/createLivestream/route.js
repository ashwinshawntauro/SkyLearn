import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { status, course_id, tutor_id,datetime,title,description} = await req.json();
    if (!status || !course_id || !tutor_id) {
        return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
        );
    }
    try {
        const createLivestream = await prisma.livestreams.create({
            data: {
                title: title,
                description:description,
                status: status,
                course_id: parseInt(course_id),
                tutor_id: parseInt(tutor_id),
                datetime: new Date(datetime).getDate()
            },
        });
        return NextResponse.json(createLivestream, { status: 200 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
