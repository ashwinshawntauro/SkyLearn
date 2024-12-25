"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Page() {
    const { assignments, courseId } = useParams();
    const classroomId = assignments.split('-')[0];
    const courseWorkId = assignments.split('-')[1];
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            const access_token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`/api/Classroom/getGradesClassroom?accessToken=${access_token}&courseId=${classroomId}&courseWorkId=${courseWorkId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`, // Correct Authorization header
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setStudents(data.submissions); // Assuming the API returns an array of submissions
                } else {
                    alert('Failed to fetch student grades');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
                alert('Error fetching student grades');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [assignments]);

    const handleSubmit = async () => {
        for (const student of students) {
            const email = student.studentEmail;
            const score = student.grade;
            try {
                const response = await fetch(`/api/getUser?userEmail=${encodeURIComponent(email)}`, {
                    method: "GET",
                });

                const data = await response.json();
                if (response.ok && data.id) {
                    const updateLeaderboard = async () => {
                        const response = await fetch('/api/updateLeaderboard', {
                            method: 'PUT',
                            body: JSON.stringify({
                                studentId: data.id,
                                courseId: courseId,
                                Score: score,
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    
                        if (response.ok) {
                            alert('Leaderboard updated successfully!');
                        } else {
                            const errorData = await response.json();
                            alert(`Error: ${errorData.message}`);  // Concatenate the message properly
                        }
                    };
                    
                    updateLeaderboard();
                    
                } else {
                    console.error(`Error fetching student ID for ${email}`);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <div className="bg-card rounded-lg shadow-lg p-6">
                    <p>Loading student data...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 max-w-4xl">
                <div className="bg-card rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-card-foreground">
                            Student Marks
                        </h2>
                        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                            Submit All Marks
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">S.No</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Student Email</TableHead>
                                    <TableHead className="w-[150px]">Marks Scored</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students && students.length > 0 ? (
                                    students.map((student, index) => (
                                        <TableRow key={student.studentEmail}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>{student.studentName}</TableCell>
                                            <TableCell>{student.studentEmail}</TableCell>
                                            <TableCell>{student.grade}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No students available
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
