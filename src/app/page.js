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
  const [sortBy, setSortBy] = useState("price"); // Default sort by price
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order is ascending
  const { logout, isLogged } = AuthContext();

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

  // Helper function to extract numeric part of duration (in hours)
  const parseDuration = (duration) => {
    if (!duration) return 0;
    const match = duration.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Sorting logic
  const sortedCourses = [...courses].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "price") {
      comparison = a.course_price - b.course_price;
    } else if (sortBy === "deadline") {
      comparison = new Date(a.enrollment_deadline) - new Date(b.enrollment_deadline);
    } else if (sortBy === "name") {
      comparison = a.course_name.localeCompare(b.course_name);
    } else if (sortBy === "duration") {
      comparison = parseDuration(a.course_duration) - parseDuration(b.course_duration);
    } else if (sortBy === "enrollments") {
      const aEnrollments = a.course_enrolments === null ? 0 : a.course_enrolments;
      const bEnrollments = b.course_enrolments === null ? 0 : b.course_enrolments;
      comparison = aEnrollments - bEnrollments;
    } else if (sortBy === "difficulty") {
      const difficultyOrder = { basic: 0, intermediate: 1, advanced: 2 };
      comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }

    // Apply sorting order (ascending or descending)
    return sortOrder === "asc" ? comparison : -comparison;
  });

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
              <a href="/mycourses" className="block p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300">My Courses</a>
              <a href="/contact" className="block p-2 rounded-md hover:bg-primary-light transition-colors hover:text-white duration-300">Contact Us</a>
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
                <h3 className="text-lg font-bold mb-4">Courses </h3>
                
                {/* Sorting Dropdowns */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center">
                    <label htmlFor="sortBy" className="mr-2">Sort By:</label>
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      <option value="price">Price</option>
                      <option value="deadline">Deadline</option>
                      <option value="name">Course Name</option>
                      <option value="duration">Duration</option>
                      <option value="enrollments">Enrollments</option>
                      <option value="difficulty">Difficulty</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <label htmlFor="sortOrder" className="mr-2">Order:</label>
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sortedCourses.map((course, index) => (
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
                        <Link href={`/courses/${encodeURIComponent(course.course_id)}`} passHref className="w-full">
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
