import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const livestreamId = searchParams.get('livestreamId');
        if (!userId || !livestreamId) {
            return NextResponse.json({ error: 'Missing userId or livestreamId parameter' }, { status: 400 });
        }
        const userIdInt = parseInt(userId, 10);
        const livestreamIdInt = parseInt(livestreamId, 10);

        if (isNaN(userIdInt) || isNaN(livestreamIdInt)) {
            return NextResponse.json({ error: 'Invalid userId or livestreamId parameter' }, { status: 400 });
        }
        const studentClass = await prisma.sTUDENTCLASSES.findFirst({
            where: {
                student_id: userIdInt,
                livestreaming_id: livestreamIdInt,
            },
            select: {
                course_id: true,
                status: true,
                livestreaming_id: true,
            },
        });

        if (!studentClass) {
            return NextResponse.json({
                status: "Missed",
                message: "You have missed this class.",
            });
        }

        const formattedResponse = {
            courseId: studentClass.course_id,
            livestreamId: studentClass.livestreaming_id,
            status: studentClass.status,
        };

        return NextResponse.json(formattedResponse); // Return formatted response
    } catch (error) {
        console.error('Error fetching student class:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
