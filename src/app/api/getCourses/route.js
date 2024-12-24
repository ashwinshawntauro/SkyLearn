import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.cOURSE.findMany({
      select: {
        course_id: true,
        course_name: true,
        course_description: true,
        course_price: true,
        course_duration: true,
        course_enrolments: true,
        difficulty: true,
        course_duration: true,
        enrollment_deadline: true,
        googleClassroomId: true,
        googleClassroomJoinLink: true,
        youtube_link: true,
        status:true,
        TEACHING: {
          select: {
            tutor_id: true,
            TUTOR: {
              // Access the relation to the TUTOR model
              select: {
                tutor_name: true,
              },
            },
          },
        },
        googleClassroomJoinLink:true,
        googleClassroomLink:true,
      },
    });

    if (courses) {
      return NextResponse.json(courses);
    }
    return NextResponse.error({ error: "No courses found" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.error(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Parse the query parameter from the URL
    const { searchParams } = new URL(req.url);
    const userCourse = searchParams.get("courseId");

    // Ensure courseId is provided and convert it to an integer
    if (!userCourse) {
      return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    const courseIdInt = parseInt(userCourse, 10);

    if (isNaN(courseIdInt)) {
      return NextResponse.json(
        { error: "Invalid courseId parameter" },
        { status: 400 }
      );
    }

    // Query the database using Prisma
    const course = await prisma.cOURSE.findUnique({
      where: { course_id: courseIdInt },
      select: {
        course_id: true,
        course_name: true,
        course_description: true,
        course_duration: true,  
        course_enrolments: true,
        course_price: true,
        difficulty: true,
        course_duration: true,
        course_enrolments: true,
        enrollment_deadline: true,
        youtube_link: true,
        googleClassroomJoinLink:true,
        googleClassroomLink:true,
        googleClassroomLink:true,
        googleClassroomId:true,
        status:true
      },
    });

    // If no course is found, return an error
    if (!course) {
      return NextResponse.json(
        { error: "No course found with this ID" },
        { status: 404 }
      );
    }

    // Return the course data as a JSON response
    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
