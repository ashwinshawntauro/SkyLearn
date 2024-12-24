'use client';

import { useState, useEffect } from 'react';
import { Plus, Calendar, MessageSquare, ChevronRight, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from "@/components/Navbar"
import { usePathname } from 'next/navigation';

// const AssignmentCard = ({ assignment }) => (
//     <Card key={assignment.id}>
//         <CardHeader>
//             <CardTitle className="text-lg">{assignment.title}</CardTitle>
//             <CardDescription>Due: {assignment.dueDate}</CardDescription>
//         </CardHeader>
//         <CardContent>
//             <p className="text-sm text-gray-600">{assignment.description}</p>
//             <Button variant="link" className="mt-2 p-0">
//                 View Details <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//         </CardContent>
//     </Card>
// );

// const PostCard = ({ post }) => (
//     <Card key={post.id}>
//         <CardHeader>
//             <CardTitle className="text-lg">{post.title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//             <p className="text-sm text-gray-600">{post.content}</p>
//             <Button variant="link" className="mt-2 p-0">
//                 Read More <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//         </CardContent>
//     </Card>
// );

export default function Page() {
    const [shareableCode, setShareableCode] = useState()
    const pathname = usePathname();
    const courseId = pathname.split('/courses/')[1]?.split('/')[0];
    const [course, setCourse] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newAssignment, setNewAssignment] = useState({ title: '', description: '', maxPoints: 100, dueDate: new Date });
    const [newPost, setNewPost] = useState({ title: '', content: '' });

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
                } catch (error) {
                    console.error("Error fetching course data:", error);
                    setCourse(null);
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
                // setShareableCode(updat)
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
        const value = e.target.value;  // Get the input date in 'YYYY-MM-DD' format
        const date = new Date(value);  // Convert to a Date object

        setNewAssignment((prevState) => ({
            ...prevState,
            dueDate: value,  // Store the string in 'YYYY-MM-DD' format in state
        }));
    };

    const addAssignment = async (title, description, maxPoints, dueDate) => {
        const yearDate = new Date(dueDate).getFullYear();  // Correctly get the year
        const monthDate = new Date(dueDate).getMonth() + 1;  // Add 1 to make it 1-based (January = 1)
        const dayDate = new Date(dueDate).getDate();  // Use getDate() to get the day of the month

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


    const addPost = () => {
        if (newPost.title.trim() !== '') {
            setPosts([...posts, { id: Date.now(), ...newPost }]);
            setNewPost({ title: '', content: '' });
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Card>
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
                                                onChange={async (e) => handleInputChange(setNewAssignment, 'title', e.target.value)}
                                            />
                                            <Input
                                                placeholder="Assignment Points"
                                                value={newAssignment.maxPoints}
                                                onChange={async (e) => handleInputChange(setNewAssignment, 'maxPoints', e.target.value)}
                                            />
                                            <Textarea
                                                placeholder="Assignment Description"
                                                value={newAssignment.description}
                                                onChange={async (e) => handleInputChange(setNewAssignment, 'description', e.target.value)}
                                            />
                                            <Input
                                                type="date"
                                                value={newAssignment.dueDate}  // Ensure it's in the right format
                                                onChange={(e) => handleDateChange(e)}
                                            />

                                            <Button onClick={() => addAssignment(newAssignment.title, newAssignment.description, newAssignment.maxPoints, newAssignment.dueDate)}>Create Assignment</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {assignments.map((assignment) => (
                                        <div key={assignment.assignment_id} className="bg-white p-4 rounded-sm border transition-all duration-300">
                                            <h3 className="text-md font-semibold text-primary mb-2">{assignment.title}</h3>
                                            <p className="text-gray-700 text-sm mb-4">{assignment.description}</p>
                                            <p className="text-sm text-gray-500 mb-4">Due Date: {assignment.due_date}</p>
                                            <div className="flex justify-end">
                                                <button
                                                    className="px-4 text-sm py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-all duration-300"
                                                    onClick={() => window.location.href = `/courses/${courseId}/classroom/${course.googleClassroomId}-${assignment.courseWorkId}`}
                                                >
                                                    View Grades
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold flex items-center">
                                    <MessageSquare className="mr-2 h-6 w-6 text-primary" />
                                    Posts
                                </CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" aria-label="Create New Post">
                                            <Plus className="h-4 w-4 mr-2" />
                                            New Post
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create New Post</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-2 py-4">
                                            <Input
                                                placeholder="Post Title"
                                                value={newPost.title}
                                                onChange={(e) => handleInputChange(setNewPost, 'title', e.target.value)}
                                            />
                                            <Textarea
                                                placeholder="Post Content"
                                                value={newPost.content}
                                                onChange={(e) => handleInputChange(setNewPost, 'content', e.target.value)}
                                            />
                                            <Button onClick={addPost}>Create Post</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <PostCard key={post.id} post={post} />
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
