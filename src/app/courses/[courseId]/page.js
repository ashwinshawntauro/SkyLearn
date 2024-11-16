"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import Navbar from "@/components/Navbar";
import NavigationTabs from "@/components/courses/NavigationTabs";

function CoursePage() {
  const course_id = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (course_id) {
      const fetchCourseData = async () => {
        try {
          const res = await fetch(`/api/getCourses/?courseId=${course_id.courseId}`, {
            method: 'POST',
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
  }, [course_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course does not exist</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      <div className="container-fluid mx-auto grid grid-cols-9 gap-3 p-4">
        <div className="col-span-6">
          <Header course={course} className="container mx-auto" />
          <div>
            <NavigationTabs course={course}/>
          </div>
        </div>

        <div className="col-span-3 flex flex-col h-full">
          <CourseDetails course={course} className="md:w-full w-full flex-grow" />
        </div>
      </div>
    </div>

  );
}

export default CoursePage;
