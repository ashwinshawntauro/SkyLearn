"use client"
import AuthProvider, { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import logo from "@/lib/icons/SkyLearn_Without_Slogan.png";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
export default function Home() {
  const [courses, setCourses] = useState([]); // State to hold courses
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/getCourses');
        const data = await res.json();
        setCourses(data); // Assuming data is an array of courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const router = useRouter()
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  const {userName} = AuthContext();
  return (
    <AuthProvider>
      <div className="flex justify-center font-[family-name:var(--font-geist-sans)]">
        {/* Main Content */}
        <div className="flex w-full h-screen">
          {/* Sidebar */}
          <aside className="w-64 h-screen text-black p-6">
            <div className="flex justify-center p-5">
              <Image
                src={logo}
                alt="SkyLearn Logo"
                width={150}
                height={50}
              />
            </div>
            <hr></hr>
            <nav className="space-y-3 my-4 flex justify-between flex-col">
              <a href="/" className="block p-2 rounded-md hover:bg-primary-light  hover:text-white transition-colors duration-300">Home</a>
              <a href="/course" className="block p-2 rounded-md hover:bg-primary-light hover:text-white  transition-colors duration-300">Courses</a>
              <a href="/my-course" className="block p-2 rounded-md hover:bg-primary-light hover:text-white  transition-colors duration-300">My Course</a>
              <a href="/learning-progress" className="block p-2 rounded-md hover:bg-primary-light transition-colors hover:text-white  duration-300">Learning Progress</a>
              <a href="/" className="block p-2 rounded-md hover:bg-primary-light transition-colors hover:text-white  duration-300">Contact Us</a>
              <a href="/signin" className="block font-semibold p-2 rounded-md  bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300">Sign In</a>
              <a href="/signup" className="block p-2 rounded-md  bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300 font-semibold">Sign Up</a>
              <a href="/" className="block font-semibold p-2 rounded-md bg-red-600 text-white text-center hover:bg-red-700 hover:text-white  transition-colors duration-300">Logout</a>
            </nav>
          </aside>

          {/* Main Dashboard Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <Navbar/>
            {/* Main Content */}
            <main className="p-6">
              <section>
                <h3 className="text-lg font-bold mb-4">Courses and Events for Product Designer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="bg-white shadow-md rounded-lg p-1">
                      <CardHeader>
                        <CardTitle className="text-primary text-md">{course.course_name}</CardTitle>
                        <CardDescription>
                          <p className="text-xl font-bold text-black text-wrap">${course.course_price}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">By: {course.instructor}</p>
                        <p className="text-sm text-gray-500">Level: {course.difficulty}</p>
                        <p className="text-sm text-red-600">Enrol By:  {new Date(course.enrollment_deadline).toLocaleDateString('en-IN')}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" ><Link href={`/courses/${encodeURIComponent(course.course_id)}`}>View Course</Link></Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
