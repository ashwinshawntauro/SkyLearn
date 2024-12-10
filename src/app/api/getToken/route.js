import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    try {
        const count = await prisma.user_tokens.count({
            where: {
                token: token,
            },
        });

        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        console.error('Error fetching token count:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
