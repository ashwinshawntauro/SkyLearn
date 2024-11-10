"use client";
import React, { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation"; // Corrected import for useRouter
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorSection from "@/components/courses/InstructorSection";
import NavigationTabs from "@/components/courses/NavigationTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 

function CoursePage() {
  const router = useRouter();
  const course_id= useSearchParams(); 
  const [course, setCourse] = useState(null); 

  useEffect(() => {
    console.log(course_id)

    if (course_id) {
      const fetchCourseData = async () => {
        try {
          const res = await fetch(`/api/getCourses/${course_id}`, {
            method: 'POST',
          });
          const data = await res.json();
          setCourse(data); // Set course data
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      };

      fetchCourseData();
    }
  }, [course_id]); 

  if (!course) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header course={course.course_name} />
      <nav className="bg-gray-200 p-4">
      </nav>

      <div className="container-fluid mx-auto grid course-grid gap-6 p-4 ">
        <Tabs
          defaultValue="Overview"
          className="w-full p-2 bg-gray-100 h-auto"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
          </TabsList>
          <TabsContent value="announcement" className="p-2">
            No Announcements from tutor yet!
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
