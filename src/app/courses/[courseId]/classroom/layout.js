"use client";

import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "../loading";
import { useRouter, useParams } from "next/navigation";

export default function Layout({ teacher }) {
  const { isLogged, role, loading: authLoading, userId } = AuthContext();
  const [isTutor, setIsTutor] = useState(null); 
  const [dataLoading, setDataLoading] = useState(true); 
  const router = useRouter();
  const { courseId } = useParams(); 

  const fetchUserDetails = useCallback(async () => {
    try {
      const [tutorRes] = await Promise.all([
        fetch(`/api/Course/getTutorCourses?tutorId=${userId}`),
      ]);
      if (role === "teacher" && tutorRes && tutorRes.ok) {
        const tutorData = await tutorRes.json();
        setIsTutor(tutorData.some((course) => course.course_id === parseInt(courseId)));
      } else {
        setIsTutor(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setDataLoading(false);
    }
  }, [userId, role, courseId]);

  useEffect(() => {
    if (userId && role && courseId) {
      fetchUserDetails();
    }
  }, [userId, role, courseId, fetchUserDetails]);

  useEffect(() => {
    if (!authLoading && !isLogged) {
      router.push("/signin");
    }
  }, [authLoading, isLogged, router]);

  if (authLoading || dataLoading) {
    return <Loading />;
  }

  if (role === "teacher" && isTutor) {
    return teacher;
  }

  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6 text-md">
          You do not have permission to view this content. Please contact support if you believe this is a mistake.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
