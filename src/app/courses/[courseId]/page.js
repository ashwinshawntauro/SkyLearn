"use client";
import React, { useEffect, useState } from "react";
import {useParams } from "next/navigation";
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorSection from "@/components/courses/InstructorSection";
import NavigationTabs from "@/components/courses/NavigationTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Header course={course} />
      <nav className="bg-gray-200 p-4"></nav>

      <div className="container-fluid mx-auto grid course-grid gap-6 p-4 ">
        <Tabs defaultValue="curriculum" className="w-full p-2 bg-gray-100 h-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
          </TabsList>
          <TabsContent value="curriculum" className="p-2">
            Course Curriculum is displayed here!
          </TabsContent>
          <TabsContent value="discussion" className="p-2">
            Live stream agenda will be displayed here.
          </TabsContent>
          <TabsContent value="review" className="p-2">
            Take down notes
          </TabsContent>
          <TabsContent value="instructors" className="p-2">
            <InstructorSection className="md:w-2/3 w-full" />
          </TabsContent>
        </Tabs>

        <CourseDetails course={course} className="md:w-1/3 w-full" />
      </div>
    </div>
  );
}

export default CoursePage;
