import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail');  

  if (!userEmail) {
    return NextResponse.json({ error: 'Missing userEmail parameter' }, { status: 400 });
  }

  try {
    const student = await prisma.sTUDENT.findUnique({
      where: { student_email: userEmail }, 
      select: {
        student_email: true,
        student_id: true,
        student_name: true,
        address:true,
      }
    });

    if (student) {
      return NextResponse.json({
        id: student.student_id,
        email: student.student_email,
        name: student.student_name,
        role: "student",
        address:student.address,
      });
    }

    const tutor = await prisma.tUTOR.findUnique({
      where: { tutor_email: userEmail },
      select: {
        tutor_email: true,
        tutor_id: true,
        tutor_name: true,
        address:true,
      }
    });

    if (tutor) {
      return NextResponse.json({
        id: tutor.tutor_id,
        email: tutor.tutor_email,
        name: tutor.tutor_name,
        address:tutor.address,
        role: "teacher"
      });
    }

    return NextResponse.json({ error: 'No user found' }, { status: 400 });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
