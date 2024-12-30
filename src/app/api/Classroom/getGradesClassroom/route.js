import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");
        const accessToken = searchParams.get("accessToken");
        const courseWorkId = searchParams.get("courseWorkId");

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

        const response = await classroom.courses.courseWork.studentSubmissions.list({
            courseId: courseId,  // Use courseId here
            courseWorkId: courseWorkId,  // Use courseworkId here
        });

        // Check if the response is successful
        if (response.status === 200) {
            const grades = response.data.studentSubmissions;

            // Map the grades to the submission data structure
            const submissionsData = [];

            for (const submission of grades) {
                const userId = submission.userId;

                // Ensure userId exists before proceeding
                if (userId) {
                    try {
                        // Fetch the student user details to get the email
                        const userResponse = await classroom.userProfiles.get({
                            userId: userId,
                        });

                        const studentEmail = userResponse.data.emailAddress;
                        const studentName = userResponse.data.name.fullName;

                        submissionsData.push({
                            studentEmail: studentEmail,
                            studentName: studentName,
                            grade: submission.assignedGrade,
                            courseWorkId: courseWorkId,
                            courseId: courseId,
                            submissionState: submission.state,
                        });
                    } catch (userError) {
                        console.error(`Error fetching user data for userId ${userId}:`, userError);
                    }
                } else {
                    console.warn(`No userId found for submission:`, submission);
                }
            }

            // Return the submissions data without uploading to the database
            return NextResponse.json({ submissions: submissionsData }, { status: 200 });
        } else {
            return NextResponse.json(
                { response: response.data },
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
