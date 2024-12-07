import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const { newUserName, newAdd, userId } = await req.json();

    if (!newUserName || !newAdd || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update user details in the database
    const updatedUser = await prisma.sTUDENT.update({
      where: {
        student_id: userId,  // Ensure you have the correct user ID for the update
      },
      data: {
        student_name: newUserName,
        address: newAdd,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
