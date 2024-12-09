import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const searchQuery = searchParams.get('search');

        const courses = await prisma.cOURSE.findMany({
            where: {
                OR: [
                    {
                        course_name: {
                            contains: searchQuery.toLowerCase(),
                        },
                    },
                    {
                        course_description: {
                            contains: searchQuery.toLowerCase(),
                        },
                    },
                ],
            },
            select: {
                course_id: true,
                course_name: true,
                course_description: true,
            },
        });
        

        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
