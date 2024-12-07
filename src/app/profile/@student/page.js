"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Dashboard() {
  const { userName, email, role, address, logout, isLogged } = AuthContext();
  const [courses, setCourses] = useState([]);
  const { userId } = AuthContext();
  const [loading, setLoading] = useState(true); // Loading state for questions

  useEffect(() => {
    const registeredCourses = async () => {
      try {
        const res = await fetch(`/api/getRegisteredCourses?userId=${userId}`);
        const data = await res.json();

        if (res.ok) {
          setCourses(data); // Set the courses that the user is registered for
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    registeredCourses();
  }, [userId]);

  const [newEmail, setNewEmail] = useState(email);

  // State for dialog form inputs
  const [oldUserName, setOldUserName] = useState(userName);
  const [oldAdd, setOldAdd] = useState(address);

  const [newUserName, setNewUserName] = useState(userName);
  const [newAdd, setAdd] = useState(address);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  if (!isLogged) {
    return <div>Sign In</div>;
  }

  const handleSave = async () => {
    try {
      const updatedData = {
        newUserName,
        newAdd,
        userId,
      };

      const res = await fetch("/api/updateUserData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User updated:", data);
        setOldUserName(data.student_name); // Reset form values after successful update
        setOldAdd(data.address);

        // Close the dialog (if you are using a modal)
        // You can use state or a ref to manage the dialog visibility
        closeDialog();
      } else {
        console.error("Error updating user:", data.error);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="container-fluid mx-auto">
      <Navbar />
      <div className="container mx-auto">
        <header className="flex justify-between items-center py-4 px-6 border-b bg-white shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
          <Button className="lg:hidden p-2 border rounded-md text-gray-700 hover:text-gray-900 focus:outline-none">
            ☰
          </Button>
        </header>

        <main className="mt-6 space-y-6">
          <section className="grid lg:grid-cols-2 gap-4">
            {/* <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Track the progress of your current projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Course: <span className="font-semibold">Intro to Computer Science</span></li>
                  <li>Status: <span className="font-semibold">Ongoing</span></li>
                  <li>Progress: <span className="font-semibold">20%</span></li>
                </ul>
              </CardContent>
            </Card> */}
            <Card className="ml-10 shadow-lg rounded-lg overflow-hidden bg-white">
              <CardHeader className="px-6 py-4 border-b border-gray-200">
                <CardTitle className="inline-flex justify-between items-center text-lg font-semibold text-gray-800">
                  <span>User Details</span>

                  {/* Edit Account Information Dialog Trigger */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                      <span
                        onClick={openDialog}
                        className="cursor-pointer text-gray-600 hover:text-gray-900 transition duration-300"
                      >
                        <svg
                          className="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </span>
                    </DialogTrigger>

                    {/* Dialog Content for Edit Account Info */}
                    <DialogContent className="px-6 py-4">
                      <DialogHeader>
                        <DialogTitle className="text-center text-xl font-semibold text-gray-800">
                          Edit your Account Info
                        </DialogTitle>
                        <DialogDescription className="mt-4 space-y-4">
                          <div>
                            <Label
                              htmlFor="userName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full Name
                            </Label>
                            <Input
                              id="userName"
                              value={newUserName}
                              onChange={(e) => setNewUserName(e.target.value)}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email Id
                            </Label>
                            <Input
                              id="email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                              disabled
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </Label>
                            <Input
                              id="address"
                              value={newAdd}
                              onChange={(e) => setAdd(e.target.value)}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        onClick={handleSave}
                        className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2"
                      >
                        Save Changes
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Your profile details are displayed here.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-4 space-y-2">
                <p className="text-sm text-gray-700">
                  Full Name:{" "}
                  <span className="font-semibold text-gray-900">
                    {oldUserName}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  Email Id:{" "}
                  <span className="font-semibold text-gray-900">{email}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Role:{" "}
                  <span className="font-semibold text-gray-900">{role}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Address:{" "}
                  <span className="font-semibold text-gray-900">
                    {oldAdd || "N/A"}
                  </span>
                </p>
              </CardContent>
            </Card>
          </section>
          <section className="mt-8 p-8">
            <h2 className="text-lg font-semibold m-4">Registered Courses</h2>
            <div className="m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.length === 0 ? (
                <p>No courses registered yet.</p> // If no courses, show a message
              ) : (
                courses.map((course) => (
                  <Card key={course.course_id} className="shadow-md">
                    <CardHeader>
                      <CardTitle>{course.course_name}</CardTitle>
                      <CardDescription>
                        {course.course_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-500">
                        Duration: {course.course_duration} weeks
                      </p>

                      <Link
                        href={`/courses/${encodeURIComponent(
                          course.course_id
                        )}`}
                        passHref
                        className="w-full"
                      >
                        <Button className="mt-4">View Course</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
