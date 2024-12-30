import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { user_id, course_id, total_score, percentage_score, is_passed } =
      await req.json();

    // Validate the input data
    if (!user_id || !course_id || total_score == null || is_passed == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert data into the quiz_results table
    const newResult = await prisma.qUIZ_RESULTS.create({
      data: {
        user_id,
        course_id,
        total_score,
        is_passed,
      },
    });

    const leaderboardUpdate = await prisma.lEADERBOARD.create({
      data: {
        student_id: user_id,
        course_id: course_id,
        rank: null,
        score: total_score,
        marksStatus: "Not graded",
        percentage_score: percentage_score,
      },
    });

    return NextResponse.json({
      message: "Quiz result added successfully",
      result: newResult,
    });
  } catch (error) {
    console.error("Error inserting quiz result:", error);

    // Handle unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Quiz already attempted for this course" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
