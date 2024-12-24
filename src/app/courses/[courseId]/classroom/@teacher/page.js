'use client';

import { useState, useEffect } from 'react';
import { Plus, Calendar, ChevronRight, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from "@/components/Navbar"
import { usePathname } from 'next/navigation';

export default function Page() {
    const pathname = usePathname();
    const courseId = pathname.split('/courses/')[1]?.split('/')[0];
    const [course, setCourse] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [shareableCode, setShareableCode] = useState()
    const [newAssignment, setNewAssignment] = useState({ title: '', description: '', maxPoints: 100, dueDate: new Date });

    useEffect(() => {
        if (courseId) {
            const fetchCourseData = async () => {
                try {
                    const res = await fetch(`/api/getCourses/?courseId=${courseId}`, {
                        method: "POST",
                    });
                    if (!res.ok) throw new Error("Course not found");
                    const data = await res.json();
                    setCourse(data);
                    setShareableCode(data.googleClassroomJoinLink)
                } catch (error) {
                    console.error("Error fetching course data:", error);
                }
            };
            fetchCourseData();
            const fetchAssignments = async () => {
                try {
                    const response = await fetch(`/api/getAssignments?courseId=${courseId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch assignments');
                    }
                    const data = await response.json();
                    setAssignments(data);
                } catch (error) {
                    setError(error.message);
                }
            };

            fetchAssignments();
        }
    }, [courseId]);

    const authenticateToken = async () => {
        const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=128899871237-aip8s1bp02dd3bhtc77q38eo3hidlhjj.apps.googleusercontent.com&redirect_uri=http://localhost:3000/authToken&scope=${encodeURIComponent('https://www.googleapis.com/auth/classroom.student-submissions.me.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos')}&prompt=select_account`;
        window.location.href = oauthUrl;
    }

    const updateClassroom = async (courseId, shareableCode) => {
        try {
            console.log(shareableCode)
            const updateResponse = await fetch("/api/updateClassroomSharing", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId: courseId,
                    googleClassroomShare: shareableCode
                }),
            });

            if (updateResponse.ok) {
                console.log(updateResponse)
                alert("Course updated");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while creating or updating the classroom");
        }
    };

    const handleInputChange = (setter, key, value) => {
        setter((prev) => ({ ...prev, [key]: value }));
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        const date = new Date(value);

        setNewAssignment((prevState) => ({
            ...prevState,
            dueDate: value,
        }));
    };

    const addAssignment = async (title, description, maxPoints, dueDate) => {
        const yearDate = new Date(dueDate).getFullYear();
        const monthDate = new Date(dueDate).getMonth() + 1;
        const dayDate = new Date(dueDate).getDate();

        console.log(dueDate)
        console.log(yearDate, monthDate, dayDate)
        try {
            const response = await fetch('/api/addAssignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: localStorage.getItem("accessToken"),
                    classroomId: course.googleClassroomId,
                    title: title,
                    description: description,
                    maxPoints: maxPoints || 100,
                    dueDate: {
                        year: yearDate,
                        month: monthDate,
                        day: dayDate,
                    },
                    courseId: courseId
                }),
            });

            if (response.ok) {
                setIsOpen(false);
                alert('Assignment created Successfully');
            } else {
                const errorData = await response.json();
                console.log('Error creating assignment:', errorData);
                alert(`Error: ${errorData.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Error: Could not create the assignment. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 overflow-auto">
                <Navbar />
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className='w-full flex justify-end mb-2'>
                        <Button onClick={authenticateToken}>Grant Permission</Button>
                    </div>
                    <Card className="flex mb-2 h-16 items-center">
                        <CardHeader className="flex flex-row items-center justify-between w-full space-y-0">
                            <div className="flex items-center space-x-2">
                                <Link className="h-6 w-6 text-primary" />
                                <CardTitle className="text-lg font-bold">Sharable Code</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    className="w-64"
                                    placeholder="Enter code"
                                    value={shareableCode}
                                    onChange={(e) => {
                                        const newCode = e.target.value;
                                        setShareableCode(newCode);
                                    }}
                                />
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0 flex justify-center items-center"
                                    onClick={() => updateClassroom(courseId, shareableCode)}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>

                    <div>
                        <Card className="p-4 shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold flex items-center">
                                    <Calendar className="mr-2 h-6 w-6 text-blue-500" />
                                    Assignments
                                </CardTitle>
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" aria-label="Create New Assignment">
                                            <Plus className="h-4 w-4 mr-2" />
                                            New Assignment
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create New Assignment</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-2 py-4">
                                            <Input
                                                placeholder="Assignment Title"
                                                value={newAssignment.title}
                                                onChange={async (e) =>
                                                    handleInputChange(setNewAssignment, 'title', e.target.value)
                                                }
                                            />
                                            <Input
                                                placeholder="Assignment Points"
                                                value={newAssignment.maxPoints}
                                                onChange={async (e) =>
                                                    handleInputChange(setNewAssignment, 'maxPoints', e.target.value)
                                                }
                                            />
                                            <Textarea
                                                placeholder="Assignment Description"
                                                value={newAssignment.description}
                                                onChange={async (e) =>
                                                    handleInputChange(setNewAssignment, 'description', e.target.value)
                                                }
                                            />
                                            <Input
                                                type="date"
                                                value={newAssignment.dueDate} // Ensure it's in the right format
                                                onChange={(e) => handleDateChange(e)}
                                            />
                                            <Button
                                                onClick={() =>
                                                    addAssignment(
                                                        newAssignment.title,
                                                        newAssignment.description,
                                                        newAssignment.maxPoints,
                                                        newAssignment.dueDate
                                                    )
                                                }
                                            >
                                                Create Assignment
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <div className="gap-3 grid grid-cols-3">
                                    {assignments.map((assignment) => (
                                        <div
                                            key={assignment.assignment_id}
                                            className="bg-white p-4 rounded-sm border transition-all duration-300"
                                        >
                                            <h3 className="text-md font-semibold text-primary mb-2">
                                                {assignment.title}
                                            </h3>
                                            <p className="text-gray-700 text-sm mb-4">
                                                {assignment.description}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Due Date: {assignment.due_date}
                                            </p>
                                            <div className="flex justify-end">
                                                <button
                                                    className="px-4 text-sm py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-all duration-300"
                                                    onClick={() =>
                                                        (window.location.href = `/courses/${courseId}/classroom/${course.googleClassroomId}-${assignment.courseWorkId}`)
                                                    }
                                                >
                                                    View Grades
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </main>
            </div>
        </div>
    );
}
