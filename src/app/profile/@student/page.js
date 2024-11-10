"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers/AuthProvider";
import { auth, signOut } from "@/lib/firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For redirecting to the login page after sign out

export default function Dashboard() {
  const { userName, email, role } = AuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track the logged-in status
  const router = useRouter(); // For navigation

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      setIsLoggedIn(false); 
    //   deleteCookie('session'); @remind Deleting cookie
      router.push("/signup");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!isLoggedIn) {
    return <div>Log In</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-lg font-bold">My Profile</h1>
        <button className="lg:hidden p-2 border rounded">☰</button>
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
              <CardTitle>User Details</CardTitle>
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
                Address: <span className="font-semibold"></span>
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
  );
}
