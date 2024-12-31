"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import Navbar from "@/components/Navbar";
import NavigationTabs from "@/components/courses/NavigationTabs";
import Loading from "./loading"

export default function Page() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (courseId) {
      const fetchCourseData = async () => {
        try {
          const res = await fetch(`/api/Course/getCourses/?courseId=${courseId}`, {
            method: "POST",
          });
          if (!res.ok) throw new Error("Course not found");
          const data = await res.json();
          setCourse(data);
        } catch (error) {
          console.error("Error fetching course data:", error);
          setCourse(null);
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    }
  }, [courseId]);

  if (loading) {
    return <Loading/>;
  }
  if (!course) {
    return <div>Course does not exist</div>;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container-fluid mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-3">
          {/* Main Content */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-6">
            <Header course={course} className="container mx-auto" />
            <div>
              <NavigationTabs course={course} />
            </div>
          </div>
  
          {/* Course Details Sidebar */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col h-full">
            <CourseDetails course={course} className="md:w-full w-full flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
  
}
