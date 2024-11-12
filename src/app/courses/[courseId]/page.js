"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorSection from "@/components/courses/InstructorSection";
import NavigationTabs from "@/components/courses/NavigationTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <div className="container-fluid mx-auto grid grid-cols-9 gap-3 p-4">
        <div className="col-span-6">
          <Header course={course} className="container mx-auto" />
          {/* Left side (Tabs) taking 6fr */}
          <div>
            <Tabs defaultValue="instructors" className="w-full p-2 bg-gray-100 h-auto">
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
          </div>
        </div>


        {/* Right side (Course Details) taking 3fr and full height */}
        <div className="col-span-3 flex flex-col h-full">
          <CourseDetails course={course} className="md:w-full w-full flex-grow" />
        </div>
      </div>
    </div>

  );
}

export default CoursePage;
