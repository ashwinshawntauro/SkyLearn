import { google } from "googleapis";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const {
            accessToken,
            name,
            section,
            descriptionHeading,
            description,
            room,
        } = await req.json();

        // Validate access token and course name
        if (!accessToken || !name) {
            return NextResponse.json(
                { error: "Access token and course name are required" },
                { status: 400 }
            );
        }

        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );

        // Set the access token
        oauth2Client.setCredentials({ access_token: accessToken });

        // Initialize Google Classroom API
        const classroom = google.classroom({ version: "v1", auth: oauth2Client });

        // Course data
        const courseData = {
            name,
            section: section || "Default Section",
            descriptionHeading: descriptionHeading || "Welcome to the Course",
            description: description || "This is a sample course created via API.",
            room: room || "Room 101",
            ownerId: "me",
        };

        // API request to create the course
        const response = await classroom.courses.create({
            requestBody: courseData,
        });

        // Return success response
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Error creating Google Classroom course:", error);

        // Handle API error response
        if (error.response) {
            console.error("Google API error details:", error.response.data);
            return NextResponse.json(
                { error: error.response.data.error.message || "Google API Error" },
                { status: error.response.status || 500 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}