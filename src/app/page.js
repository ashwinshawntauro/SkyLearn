"use client"
import AuthProvider from "@/providers/AuthProvider";
import Image from "next/image";
import logo from "@/lib/icons/SkyLearn_Without_Slogan.png";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  }, []); // Empty dependency array means this will run once on mount

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <AuthProvider>
      <div className="flex justify-center font-[family-name:var(--font-geist-sans)]">
        {/* Main Content */}
        <div className="flex w-full h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg--100 h-screen p-6 text-gray">
            <div className="flex justify-center p-5">
              <Image
                src={logo}
                alt="SkyLearn Logo"
                width={150}
                height={50} // Assuming a height for better layout
              />
            </div>
            <nav className="space-y-6">
              <a href="/" className="block hover:bg-gray-700 p-2 rounded text-gray-200">Home</a>
              <a href="/course" className="block hover:bg-gray-700 p-2 rounded">Courses</a>
              <a href="/my-course" className="block hover:bg-gray-700 p-2 rounded">My Course</a>
              <a href="/learning-progress" className="block hover:bg-gray-700 p-2 rounded">Learning Progress</a>
              <a href="/" className="block hover:bg-gray-700 p-2 rounded">Contact Us</a>
              <a href="/signin" className="block hover:bg-gray-700 p-2 rounded bg-secondary">Sign In</a>
              <a href="/signup" className="block hover:bg-gray-700 p-2 rounded bg-primary">Sign Up</a>
              <a href="/" className="block hover:bg-gray-700 p-2 rounded bg-red-700">Logout</a>
            </nav>
          </aside>

          {/* Main Dashboard Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <header className="flex items-center justify-between p-4 bg-white shadow">
              <input
                type="text"
                placeholder="Press ⌘ + F to search"
                className="p-2 border rounded-md"
              />
              <div className="flex items-center space-x-4">
                <span className="bg-accent p-2 rounded">Coupons</span>
                <button className="hover:bg-primary p-2 rounded-lg">
                  <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                  </svg>
                </button>
                <button className="hover:bg-primary p-2 rounded-lg ">
                  <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
              {/* Learning Path */}

              {/* Course Cards */}
              <section>
                <h3 className="text-lg font-bold mb-4">Courses and Events for Product Designer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="bg-white shadow-md rounded-lg p-1">
                      <CardHeader>
                        <CardTitle>{course.course_name}</CardTitle>
                        <CardDescription>
                        <p className="text-lg font-bold text-black text-wrap">${course.course_price}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                      <p className="text-sm text-gray-500">By: {course.instructor}</p>
                      <p className="text-sm text-gray-500">Level: {course.difficulty}</p>
                      <p className="text-sm text-red-600">Enrol By: {course.enrollment_deadline}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Enroll Now</Button>
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
