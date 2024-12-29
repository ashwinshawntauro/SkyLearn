"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Loading from "../loading";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({teacher }) {
  const { isLogged, role, loading, userId } = AuthContext();
  const [isTutor, setIsTutor] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const courseId = pathname.split("/")[2];

  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId || !courseId) return;

      try {
        setIsDataLoading(true);

        if (role === "teacher") {
          const tutorRes = await fetch(`/api/Course/getTutorCourses?tutorId=${userId}`);
          const tutorData = await tutorRes.json();
          const isTeaching = tutorData.some(
            (course) => course.course_id === parseInt(courseId)
          );
          setIsTutor(isTeaching);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsTutor(false);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDetails();
  }, [userId, courseId, role]);

  const renderAccessDenied = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-4 text-lg">You do not have permission to access this page.</p>
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm w-full font-semibold text-white bg-primary rounded-lg hover:bg-primary-light"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );

  if (loading || isDataLoading) {
    return <Loading />;
  }

  if (!isLogged) {
    router.push("/signin");
    return null; 
  }

  if (role === "teacher") {
    return isTutor ? teacher : renderAccessDenied();
  }
  return null; 
}
