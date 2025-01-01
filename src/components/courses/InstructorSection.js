import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function InstructorSection({ course }) {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const courseId =course.course_id
  useEffect(() => {
    async function fetchInstructor() {
      try {
        const response = await fetch(`/api/Course/getCourseTutor?courseId=${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch instructor data");
        }
        const data = await response.json();
        setInstructor(data[0]); // Assuming the API returns an array
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      fetchInstructor();
    }
  }, [courseId]);

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-600">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meet Your Instructor</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <InstructorSkeleton />
        ) : instructor ? (
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${instructor.tutor_name}&background=1e90ff&color=FFFFFF`} alt={instructor.tutor_name} />
              <AvatarFallback>{instructor.tutor_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{instructor.tutor_name}</h3>
              <p className="text-sm text-muted-foreground">Department: {instructor.department}</p>
              <p className="text-sm text-muted-foreground">Address: {instructor.address}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No instructor data available.</p>
        )}
      </CardContent>
    </Card>
  );
}

function InstructorSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export default InstructorSection;

