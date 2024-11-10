import { NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req) => {
  const { name, email, role,id} = await req.json();

  try {
    let newUser;
    if (role === "student") {
      newUser = await prisma.sTUDENT.create({
        data: {
          student_name: name,
          student_email: email,
          user_id: id,
        },
      });
    } else if (role === "teacher") {
      newUser = await prisma.tUTOR.create({
        data: {
          user_id:id,
          tutor_name:name,
          tutor_email:email,
        },
      });
      return NextResponse.json(newUser);
    } else {
      return NextResponse.error('Invalid role, must be "student" or "teacher"',500)
    }
    return NextResponse.json(newUser)
  } catch (error) {
    console.error("Error storing data with Prisma:", error);
    return NextResponse.error('Error storing data',500)
  }
}
