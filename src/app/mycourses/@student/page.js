"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorSection from "@/components/courses/InstructorSection";
import NavigationTabs from "@/components/courses/NavigationTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/providers/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";

// Page.js
export default function Page() {
  const { userId } = AuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for questions

  useEffect(() => {
    const registeredCourses = async () => {
      try {
        const res = await fetch(`/api/Course/getRegisteredCourses?userId=${userId}`);
        const data = await res.json();
        console.log(data);

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

  const enrolledCourses = courses.filter((course) => !course.course_completion);
  const completedCourses = courses.filter((course) => course.course_completion);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <Navbar />
      <div className="px-8 py-6">
        {/* Course Metrics Section */}
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>

        {loading ? (
          <Loading/>
        ) : (
          <>
            <div className="flex space-x-24 text-gray-800 mb-8">
              <div>
                <p className="text-lg font-semibold">Course Enrolments</p>
                <p className="text-gray-500">{enrolledCourses.length} Active</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Course Completions</p>
                <p className="text-gray-500">
                  {completedCourses.length} Completed Courses
                </p>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-semibold m-4">Enrolled Courses</h2>
              <div className="m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.length === 0 ? (
                  <p>No courses enrolled yet.</p>
                ) : (
                  enrolledCourses.map((course) => (
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

            <section className="mt-8">
              <h2 className="text-lg font-semibold m-4">Completed Courses</h2>
              <div className="m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedCourses.length === 0 ? (
                  <p>No courses Completed yet.</p>
                ) : (
                  completedCourses.map((course) => (
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
          </>
        )}
      </div>
    </div>
  );
}
