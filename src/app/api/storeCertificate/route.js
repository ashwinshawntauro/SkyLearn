import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
      // Retrieve the certificate_id from the query parameters
      const certificate_id = request.nextUrl.searchParams.get("certificate_id");  // Corrected to get the value
  
      // Validate the incoming data
      if (!certificate_id) {
        return NextResponse.json(
          { error: "Missing certificate_id" },
          { status: 400 }
        );
      }
  
      // Query the database for the certificate by certificate_id
      const certificates = await prisma.cERTIFICATES.findUnique({
        where: {
          certificate_id: certificate_id, // Ensure certificate_id is an integer if necessary
        },
        select: {
          certificate_url: true, // Only select the 'certificate_url' field
        },
      });
  
      // If no certificate found, return a 404 error
      if (!certificates) {
        return NextResponse.json(
          { error: "Certificate not found" },
          { status: 404 }
        );
      }
  
      // Return the certificate URL
      return NextResponse.redirect(certificates.certificate_url);
    } catch (error) {
      console.error("Error fetching certificate:", error);
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
