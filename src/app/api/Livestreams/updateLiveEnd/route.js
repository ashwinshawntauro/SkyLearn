import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { livestreamId } = await req.json();
        const updatedLivestream = await prisma.livestreams.update({
            where: {
                id: parseInt(livestreamId), 
            },
            data: {
                status: 'ended',
            },
        });

        return NextResponse.json(updatedLivestream, { status: 200 });
    } catch (error) {
        console.error('Error updating livestream status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
