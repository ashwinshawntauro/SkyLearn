import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Parse the query parameter from the URL
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // Validate courseId
    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId parameter" }, { status: 400 });
    }

    const courseIdInt = parseInt(courseId, 10);

    if (isNaN(courseIdInt)) {
      return NextResponse.json({ error: "Invalid courseId parameter" }, { status: 400 });
    }

    // Query the database using Prisma
    const tutorDetails = await prisma.cOURSE.findUnique({
      where: { course_id: courseIdInt },
      select: {
        TEACHING: {
          select: {
            TUTOR: {
              select: {
                tutor_name: true,
                department: true,
                address: true,
              },
            },
          },
        },
      },
    });

    // Handle case where no course or tutor details are found
    if (!tutorDetails || !tutorDetails.TEACHING.length) {
      return NextResponse.json(
        { error: "No tutor details found for this course ID" },
        { status: 404 }
      );
    }

    // Extract the tutor details
    const tutorData = tutorDetails.TEACHING.map((teaching) => teaching.TUTOR);

    // Return the tutor details as a JSON response
    return NextResponse.json(tutorData);
  } catch (error) {
    console.error("Error fetching tutor details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
