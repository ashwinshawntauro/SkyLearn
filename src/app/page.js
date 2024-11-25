"use client";
import AuthProvider, { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import logo from "@/lib/icons/SkyLearn_Without_Slogan.png";
import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, isLogged } = AuthContext()

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/getCourses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

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
                loading="eager"
              />
            </div>
            <hr />
            <nav className="space-y-3 my-4 flex justify-between flex-col">
              <a href="/" className="block p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300">Home</a>
              <a href="/mycourses" className="block p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300">My Course</a>
              <a href="/learning-progress" className="block p-2 rounded-md hover:bg-primary-light transition-colors hover:text-white duration-300">Learning Progress</a>
              <a href="/" className="block p-2 rounded-md hover:bg-primary-light transition-colors hover:text-white duration-300">Contact Us</a>
              {!isLogged &&
                <div>
                  <a href="/signin" className="block font-semibold p-2 my-2 rounded-md bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300">Sign In</a>
                  <a href="/signup" className="block p-2 rounded-md my-2 bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300 font-semibold">Sign Up</a>
                </div>
              }
              {isLogged && <a onClick={logout} className="cursor-pointer block font-semibold p-2 rounded-md bg-red-600 text-white text-center hover:bg-red-700 hover:text-white transition-colors duration-300">Logout</a>}
            </nav>
          </aside>

          {/* Main Dashboard Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <Navbar />
            {/* Main Content */}
            <main className="p-6">
              <section>
                <h3 className="text-lg font-bold mb-4">Courses and Events for Product Designer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {courses.map((course, index) => (
                    <Card key={course.id || `${course.course_id}-${index}`} className="bg-white shadow-md rounded-lg p-1">
                      <CardHeader>
                        <CardTitle className="text-primary text-md font-bold">{course.course_name}</CardTitle>
                        <CardDescription>
                          <span className="text-xl font-bold text-black">₹{course.course_price}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">By: {course.instructor}</p>
                        <p className="text-sm text-gray-500">Level: {course.difficulty}</p>
                        <p className="text-sm text-red-600 py-2 font-semibold text-center">
                          Deadline: {new Date(course.enrollment_deadline).toLocaleDateString("en-IN")}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/courses/${encodeURIComponent(course.course_id)}`} passHref  className="w-full">
                          <Button className="w-full">View Course</Button>
                        </Link>
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
