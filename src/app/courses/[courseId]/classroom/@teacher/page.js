'use client';

import { useState } from 'react';
import { Plus, Calendar, MessageSquare, ChevronRight, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from "@/components/Navbar"
import { usePathname, useRouter } from 'next/navigation';

/**
 * @typedef {Object} Assignment
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} dueDate
 */

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @param {{ assignment: Assignment }} props
 */
const AssignmentCard = ({ assignment }) => (
    <Card key={assignment.id}>
        <CardHeader>
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <CardDescription>Due: {assignment.dueDate}</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-600">{assignment.description}</p>
            <Button variant="link" className="mt-2 p-0">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </CardContent>
    </Card>
);

/**
 * @param {{ post: Post }} props
 */
const PostCard = ({ post }) => (
    <Card key={post.id}>
        <CardHeader>
            <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-600">{post.content}</p>
            <Button variant="link" className="mt-2 p-0">
                Read More <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </CardContent>
    </Card>
);

export default function Page() {
    const [shareableCode, setShareableCode] = useState()
    const pathname = usePathname();
    const courseId = pathname.split('/courses/')[1]?.split('/')[0];
    // console.log(courseId)
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

    /** @type {[Assignment[], Function]} */
    const [assignments, setAssignments] = useState([]);
    /** @type {[Post[], Function]} */
    const [posts, setPosts] = useState([]);
    /** @type {[{ title: string, description: string, dueDate: string }, Function]} */
    const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });
    /** @type {[{ title: string, content: string }, Function]} */
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleInputChange = (setter, key, value) => {
        setter((prev) => ({ ...prev, [key]: value }));
    };

    const addAssignment = () => {
        if (newAssignment.title.trim() !== '') {
            setAssignments([...assignments, { id: Date.now(), ...newAssignment }]);
            setNewAssignment({ title: '', description: '', dueDate: '' });
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
                                <Dialog>
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
                                                onChange={(e) => handleInputChange(setNewAssignment, 'title', e.target.value)}
                                            />
                                            <Textarea
                                                placeholder="Assignment Description"
                                                value={newAssignment.description}
                                                onChange={(e) => handleInputChange(setNewAssignment, 'description', e.target.value)}
                                            />
                                            <Input
                                                type="date"
                                                value={newAssignment.dueDate}
                                                onChange={(e) => handleInputChange(setNewAssignment, 'dueDate', e.target.value)}
                                            />
                                            <Button onClick={addAssignment}>Create Assignment</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {assignments.map((assignment) => (
                                        <AssignmentCard key={assignment.id} assignment={assignment} />
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
