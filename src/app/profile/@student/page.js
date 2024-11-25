"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  const { userName, email, role, logout, isLogged } = AuthContext();
  
  // State for dialog form inputs
  const [newUserName, setNewUserName] = useState(userName);
  const [newEmail, setNewEmail] = useState(email);
  const [newAdd, setAdd] = useState("email");
  
  if (!isLogged) {
    return <div>Sign In</div>;
  }

  const handleSave = () => {
    // Handle save functionality here (e.g., API call to update user info in the database)
    console.log("Updated Info:", { newUserName, newEmail });
  };

  return (
    <div className="container-fluid mx-auto">
      <Navbar />
      <div className="container mx-auto">
        <header className="flex justify-between items-center py-4 border-b">
          <h1 className="text-lg font-bold">My Profile</h1>
          <Button className="lg:hidden p-2 border rounded">☰</Button>
          <nav className="hidden lg:flex space-x-4">
            <Button onClick={logout} className="bg-red-600 hover:bg-red-500">Logout</Button>
          </nav>
        </header>
        <main className="mt-6 space-y-6">
          <section className="grid lg:grid-cols-2 gap-4">
            <Card className="shadow-sm">
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
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex justify-between">
                  <span>User Details</span>

                  {/* Edit Account Information Dialog Trigger */}
                  <Dialog>
                    <DialogTrigger>
                      <span className="font-semibold">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex justify-center">Edit your Account Info</DialogTitle>
                        <DialogDescription>
                          <div className="space-y-4 my-2">
                            <div>
                              <Label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                Full Name
                              </Label>
                              <Input
                                id="userName"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Id
                              </Label>
                              <Input
                                id="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Address
                              </Label>
                              <Input
                                id="address"
                                value={newAdd}
                                onChange={(e) => setAdd(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <Button onClick={handleSave} className="mt-4">
                        Save Changes
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>Your profile details are displayed here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Full Name <span className="font-semibold">{userName}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Email Id: <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Role: <span className="font-semibold">{role}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Address:
                </p>
              </CardContent>
            </Card>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Registered Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Intro to Computer Science</CardTitle>
                  <CardDescription>Comprehensive Computer Course</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500">Duration: 12 weeks</p>
                  <Button className="mt-4">View Course</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
