import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Retrieve the certificate_id, course_id, and student_id from the query parameters
    // const certificate_id = request.nextUrl.searchParams.get("certificate_id");
    const course_id = request.nextUrl.searchParams.get("course_id");
    const student_id = request.nextUrl.searchParams.get("student_id");

    // Validate the incoming data
    if ( !course_id || !student_id) {
      return NextResponse.json(
        { error: "Missing required parameters: certificate_id, course_id, or student_id" },
        { status: 400 }
      );
    }

    // Query the database for the certificate by certificate_id, course_id, and student_id
    const certificate = await prisma.cERTIFICATES.findFirst({
      where: {
        course_id: parseInt(course_id), // Ensure course_id is an integer
        student_id: parseInt(student_id), // Ensure student_id is an integer
      },
      select: {
        certificate_url: true, // Only select the 'certificate_url' field
      },
    });

    // Return a response indicating whether the certificate exists
    if (certificate) {
      return NextResponse.json({
        isCertificate: true,
        certificate_url: certificate.certificate_url, // Include URL if it exists
      });
    } else {
      return NextResponse.json({
        isCertificate: false,
        message: "Certificate not found",
      });
    }
  } catch (error) {
    console.error("Error checking certificate:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    // Parse the JSON payload from the request
    const body = await request.json();
    const { student_id, course_id, certificate_id, certificate_url } = body;

    // Validate the incoming data
    if (!student_id || !course_id || !certificate_id || !certificate_url) {
      return NextResponse.json(
        { error: "Missing required fields: userId, courseId, certificateUrl" },
        { status: 400 }
      );
    }

    // Insert the new certificate record into the database
    const newCertificate = await prisma.cERTIFICATES.create({
      data: {
        student_id: parseInt(student_id, 10), // Convert student_id to integer
        course_id: parseInt(course_id, 10),
        certificate_id,
        certificate_url,
      },
    });

    // Return the created certificate
    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    console.error("Error adding certificate:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
