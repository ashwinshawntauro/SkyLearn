import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { duration, liveId } = await req.json();
    try {
        const existingClass = await prisma.sTUDENTCLASSES.findFirst({
            where: {
                livestreaming_id: parseInt(liveId), 
            },
            select: {
                id: true, 
                attended_duration: true,
            },
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Livestreaming record not found" }, { status: 404 });
        }
        const newAttendedDuration = existingClass.attended_duration + parseInt(duration);
        const updatedClass = await prisma.sTUDENTCLASSES.update({
            where: {
                id: existingClass.id, 
            },
            data: {
                attended_duration: parseInt(newAttendedDuration), 
            },
        });

        return NextResponse.json(updatedClass, { status: 200 });

    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
