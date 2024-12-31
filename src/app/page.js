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
import Loading from "./loading"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const { userId, role, logout, isLogged } = AuthContext();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const endpoint =
          role === "teacher" && userId
            ? `/api/Course/getTutorCourses?tutorId=${userId}`
            : "/api/Course/getCourses";

        const res = await fetch(endpoint);
        const data = await res.json();
        setCourses(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userId, role]);

  const parseDuration = (duration) => {
    if (!duration) return 0;
    const match = duration.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const sortedCourses = [...courses].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "price") {
      comparison = a.course_price - b.course_price;
    } else if (sortBy === "deadline") {
      comparison =
        new Date(a.enrollment_deadline) - new Date(b.enrollment_deadline);
    } else if (sortBy === "name") {
      comparison = a.course_name.localeCompare(b.course_name);
    } else if (sortBy === "duration") {
      comparison =
        parseDuration(a.course_duration) - parseDuration(b.course_duration);
    } else if (sortBy === "enrollments") {
      const aEnrollments =
        a.course_enrolments === null ? 0 : a.course_enrolments;
      const bEnrollments =
        b.course_enrolments === null ? 0 : b.course_enrolments;
      comparison = aEnrollments - bEnrollments;
    } else if (sortBy === "difficulty") {
      const difficultyOrder = { basic: 0, intermediate: 1, advanced: 2 };
      comparison =
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <div className="flex justify-center font-[family-name:var(--font-geist-sans)]">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row w-full min-h-screen max-h-full">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 h-full text-gray-700 p-4 lg:p-6 bg-zinc-100">
            <div className="lg:fixed">
              <div className="flex justify-center p-5 bg-white rounded-xl mb-4">
                <Image
                  src={logo}
                  alt="SkyLearn Logo"
                  width={150}
                  height={50}
                  loading="eager"
                  className="object-contain"
                />
              </div>
              <hr className="mb-4" />
              <nav className="space-y-3 my-4 flex flex-col font-bold">
                <div className="flex items-center group p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#3371b8"
                    className="pb-1"
                  >
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                  </svg>
                  <Link href="/profile" className="ml-2">
                    Profile
                  </Link>
                </div>
  
                <div className="flex items-center p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#3371b8"
                    className="pb-1"
                  >
                    <path d="M160-80q-17 0-28.5-11.5T120-120v-558q0-15 6-25.5t20-16.5l400-160q20-8 37 5.5t17 34.5v120h40q17 0 28.5 11.5T680-680v120h-80v-80H200v480h207l80 80H160Zm200-640h160v-62l-160 62ZM680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Zm-50-100 160-100-160-100v200Zm-430 20v-480 480Z" />
                  </svg>
                  <Link href="/mycourses" className="ml-2">
                    My Course
                  </Link>
                </div>
  
                <div className="flex items-center p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#3371b8"
                    className="pb-1"
                  >
                    <path d="M480-400q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM320-240h320v-23q0-24-13-44t-36-30q-26-11-53.5-17t-57.5-6q-30 0-57.5 6T369-337q-23 10-36 30t-13 44v23ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80Zm0-80v-446L526-800H240v640h480Zm-480 0v-640 640Z" />
                  </svg>
                  <Link href="/contact" className="ml-2">
                    Contact Us
                  </Link>
                </div>
  
                {!isLogged && (
                  <div>
                    <Link
                      href="/signin"
                      className="block font-semibold p-2 my-2 rounded-md bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block p-2 rounded-md my-2 bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300 font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                {isLogged && (
                  <Button
                    onClick={logout}
                    className="cursor-pointer block font-semibold p-2 rounded-md bg-[#f55045] text-white text-center hover:bg-red-700 hover:text-white transition-colors duration-300"
                  >
                    Logout
                  </Button>
                )}
              </nav>
            </div>
          </aside>
  
          {/* Main Dashboard Area */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Top Bar */}
            <Navbar />
            {/* Main Content */}
            <main className="p-4 lg:p-6 rounded-lg">
              <section>
                <h3 className="text-2xl font-bold mb-4">Courses</h3>
  
                {/* Sorting Dropdowns */}
                <div className="mb-4 flex flex-wrap justify-end gap-4">
                  <div className="flex items-center">
                    <Label htmlFor="sortBy">Sort By: </Label>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value)}
                    >
                      <SelectTrigger id="sortBy" className="w-[150px] lg:w-[200px]">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="name">Course Name</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                        <SelectItem value="enrollments">Enrollments</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
  
                  <div className="flex items-center">
                    <Label htmlFor="sortOrder">Order:</Label>
                    <Select
                      value={sortOrder}
                      onValueChange={(value) => setSortOrder(value)}
                    >
                      <SelectTrigger id="sortOrder" className="w-[150px] lg:w-[200px]">
                        <SelectValue placeholder="Select order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
  
                {/* Course Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sortedCourses.map((course, index) => (
                    <Card
                      key={course.id || `${course.course_id}-${index}`}
                      className="bg-white shadow-md border rounded-lg p-4"
                    >
                      <CardHeader>
                        <CardTitle className="text-primary text-md font-semibold">
                          {course.course_name}
                        </CardTitle>
                        <CardDescription>
                          <span className="text-base font-bold text-gray-800">
                            ₹ {course.course_price}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {course.TEACHING.length > 0 &&
                          course.TEACHING.map((teaching, idx) => (
                            <p
                              key={idx}
                              className="text-sm text-gray-500 font-semibold"
                            >
                              By: {teaching.TUTOR.tutor_name}
                            </p>
                          ))}
                        <p className="text-sm text-gray-500 font-semibold">
                          Level: {course.difficulty}
                        </p>
                        <p className="text-sm text-[#f55045] font-semibold">
                          Deadline:{" "}
                          {new Date(
                            course.enrollment_deadline
                          ).toLocaleDateString("en-IN")}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={`/courses/${encodeURIComponent(
                            course.course_id
                          )}`}
                          passHref
                          className="block w-full text-center bg-primary rounded-md p-2 text-white text-sm hover:bg-blue-800"
                        >
                          View Details
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
