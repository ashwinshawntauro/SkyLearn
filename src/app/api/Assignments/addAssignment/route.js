import { google } from "googleapis";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(req) {
    const prisma = new PrismaClient();
    try {
        const { accessToken, classroomId, title, description, maxPoints, dueDate,courseId } = await req.json();
        console.log(dueDate);

        if (!accessToken) {
            return NextResponse.json(
                { error: "Access token required" },
                { status: 400 }
            );
        }

        const oauth2Client = new google.auth.OAuth2(
            "128899871237-aip8s1bp02dd3bhtc77q38eo3hidlhjj.apps.googleusercontent.com",
            "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",
            "http://localhost:5000/authToken"
        );
        oauth2Client.setCredentials({ access_token: accessToken });
        const classroom = google.classroom({ version: "v1", auth: oauth2Client });

        const assignment = {
            title: title,
            description: description,
            maxPoints: maxPoints || 100,
            workType: 'ASSIGNMENT',
            state: 'PUBLISHED',
            dueDate: {
                year: dueDate.year,
                month: dueDate.month,
                day: dueDate.day,
            },
            dueTime: { hours: 23, minutes: 59 },
        };

        // Await the response from the API call to create the assignment
        const response = await classroom.courses.courseWork.create({
            courseId: classroomId,
            requestBody: assignment,
        });

        // Handle the response and insert into the database
        if (response.status === 200) {
            const createAssgn = await prisma.aSSIGNMENT.create({
                data: {
                    title: title,
                    description: description,
                    due_date: new Date(dueDate.year, dueDate.month - 1, dueDate.day),
                    courseWorkId: response.data.id, 
                    course_id: parseInt(courseId)
                },
            });

            return NextResponse.json({ message: 'Assignment created successfully', assignment: createAssgn }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Failed to create assignment in Google Classroom" },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
