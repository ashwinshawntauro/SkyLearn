import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    const { token } = req.nextUrl.searchParams;

    // Validate the token
    if (!token) {
        return NextResponse.json(
            { error: 'token is required' },
            { status: 400 }
        );
    }

    try {
        // Use count to get the number of occurrences of the specific token
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
