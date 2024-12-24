import { google } from "googleapis";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PUT(req) {
    const { courseId, googleClassroomId,googleClassroomLink} = await req.json();
    if(!courseId){
        return NextResponse.json("Invalid courseId",{status:400})
    }
    try {
      const updatedCourse = await prisma.cOURSE.update({
        where: { course_id: courseId },
        data: {
          googleClassroomId:googleClassroomId,
          googleClassroomLink: googleClassroomLink
        }
      });
      return NextResponse.json(updatedCourse);
    } catch (error) {
      console.error('Error updating course with classroom details:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

