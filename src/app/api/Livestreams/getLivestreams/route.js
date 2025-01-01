import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const getLivestreams = await prisma.livestreams.findMany({
            select:{
                id:true,
                status:true,
                course_id:true,
                tutor_id:true,
                title:true,
                description:true,
                datetime:true,
                refLiveId:true,
                time:true
            },
            orderBy: {
                id: 'desc'
            }
        });
        return NextResponse.json(getLivestreams, { status: 200 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
