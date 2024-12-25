import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const studentId = searchParams.get("studentId");

    if (!courseId || !studentId) {
      return NextResponse.json({ error: "Missing courseId or studentId" }, { status: 400 });
    }

    const courseIdInt = parseInt(courseId, 10);
    const studentIdInt = parseInt(studentId, 10);
    const result = await prisma.$queryRaw`
      CALL calculate_attendance_and_quiz_status(${courseIdInt}, ${studentIdInt});
    `;

    if (result && result.length > 0) {
      const data = result[0]; 
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "No data returned from the stored procedure" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching attendance and quiz status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}