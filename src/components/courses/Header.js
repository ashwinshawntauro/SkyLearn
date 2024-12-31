"use client";

import { AuthContext } from "@/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function Header({ course }) {
  const { role, userId, userName } = AuthContext();
  const { toast } = useToast();
  const courseId = course.course_id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPurchased, setIsPurchased] = useState(null);
  const [isTutor, setIsTutor] = useState(null);
  const [getProgressValue, setProgressValue] = useState([]);
  const [isCourseEnded, setIsCourseEnded] = useState(false); // Track course status
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [certificateExists, setCertificateExists] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");


  const checkCertificateExistence = async () => {
    try {
      const response = await fetch(
        `/api/storeCertificate?student_id=${userId}&course_id=${courseId}`
      );
      const data = await response.json();
      if (response.ok && data?.isCertificate) {
        setCertificateExists(true); // Certificate exists
        setCertificateUrl(data.certificate_url); // Store the certificate URL

      } else {
        setCertificateExists(false); // No certificate found
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };

  useEffect(() => {
    if (userId && courseId) {
      checkCertificateExistence();
    }
  }, [userId, courseId]);

  // Function to get course status
  const getCourseStatus = async () => {
    try {
      const response = await fetch(
        `/api/Course/getCourseStatus?courseId=${course.course_id}`
      );
      const data = await response.json();
      if (response.ok) {
        setIsCourseEnded(data.isEnded); // Assuming response contains `isEnded` field
      } else {
        setIsCourseEnded(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Couldn't fetch course status",
      });
    }
  };

  const endCourse = async () => {
    setIsLoading(true); // Start loading when the button is clicked

    try {
      const response = await fetch("/api/Course/endCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.course_id,
        }),
      });
      if (response.ok) {
        toast({
          variant: "success",
          title: "SkyLearn",
          description: "Course has been ended",
        });
        getCourseStatus(); // Re-fetch course status after ending
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Sorry, there was an error",
      });
    } finally {
      setIsLoading(false); // Stop loading when the process finishes
    }
  };

  const generateCertificate = async () => {
    setIsModalOpen(true);
    setProgress(0);
  };

  const genCert = async () => {
    try {
      // Step 1: Fetch certificate data
      const fetchResponse = await fetch(
        `/api/fetchCertificate?uid=${userId}&course_id=${course.course_id}&candidate_name=${userName}&course_name=${course.course_name}&org_name=SkyLearn`
      );

      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`);
      }

      const data = await fetchResponse.json();

      // Prepare certificate data for storage
      const certificateData = {
        student_id: data.data.student_id, // Replace with actual student ID
        course_id: data.data.course_id, // Replace with actual course ID
        certificate_id: data.data.certificate_id, // Unique certificate ID
        certificate_url: data.data.ipfs_link, // URL of the certificate
      };

      // Step 2: Store certificate data
      try {
        const storeResponse = await fetch("/api/storeCertificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(certificateData),
        });

        const result = await storeResponse.json();
        if (storeResponse.ok) {
          console.log("Certificate stored successfully:", result);
        } else {
          console.error("Error storing certificate:", result.error);
        }
      } catch (storeError) {
        console.error(
          "Error sending request to store certificate:",
          storeError
        );
      }
    } catch (fetchError) {
      console.error("Error fetching certificate data:", fetchError);
    }
  };

  const getProgress = async () => {
    try {
      const response = await fetch(
        `/api/getProgress?studentId=${userId}&courseId=${course.course_id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProgressValue(data);
      } else {
        setProgressValue([]);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Couldn't fetch the progress",
      });
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (!userId) return;
      try {
        // Check if user is enrolled
        const enrollRes = await fetch(
          `/api/Enrollments/getEnroll?student_id=${encodeURIComponent(userId)}`
        );
        const enrollData = await enrollRes.json();
        const isEnrolled = (enrollData.getEnroll || []).some(
          (course) => course.course_id === courseId
        );
        setIsPurchased(isEnrolled);

        if (role === "teacher") {
          const tutorRes = await fetch(
            `/api/Course/getTutorCourses?tutorId=${userId}`
          );
          const tutorData = await tutorRes.json();
          setIsTutor(tutorData.some((course) => course.course_id === courseId));
        } else {
          setIsTutor(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initializeData();
    getProgress();
    getCourseStatus(); // Fetch course status on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, courseId, role]);

  return (
    <div>
      <div className="bg-primary text-white py-8 px-8 rounded-sm">
        <div className="container mx-auto text-center">
          <h1 className="text-xl font-bold mb-4">{course.course_name}</h1>
          <span className="mb-4 font-extralight">
            {course.course_description}
          </span>
        </div>
        {role === "teacher" && isTutor && !isCourseEnded && (
          <div className="inline-flex relative top-6 w-full justify-between">
            <Button
              className="bg-white hover:bg-zinc-300 font-semibold text-black"
              onClick={() => router.push(`${course.course_id}/classroom`)}
            >
              Classroom Manager
            </Button>
            <Button
              className="bg-white hover:bg-zinc-300 text-black font-semibold"
              onClick={endCourse}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <svg
                    className="w-5 h-5 animate-spin text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 11-8-8z"
                    ></path>
                  </svg>
                  <span>Ending Course...</span>
                </div>
              ) : (
                "End Course"
              )}
            </Button>
          </div>
        )}
        {role === "teacher" && isTutor && isCourseEnded && (
          <div className="inline-flex relative top-6 w-full justify-between">
            <Button
              className="bg-white hover:bg-zinc-300 font-semibold text-black"
              onClick={() => router.push(`${course.course_id}/classroom`)}
            >
              Classroom Manager
            </Button>
            <Button
              className="bg-white hover:bg-zinc-300 text-black font-semibold"
              disabled
            >
              Course Ended
            </Button>
          </div>
        )}
        <div className="inline-flex w-full justify-between">
          {role === "student" &&
            isCourseEnded &&
            isPurchased &&
            !certificateExists && (
              <Button
                className="bg-white hover:bg-zinc-300 font-semibold text-black"
                onClick={generateCertificate}
              >
                Generate Certificate
              </Button>
            )}

          {role === "student" && certificateExists && (
            <Button
              className="bg-white hover:bg-zinc-300 font-semibold text-black"
              onClick={() => window.open(certificateUrl, "_blank")}
              >
              View Certificate
            </Button>
          )}
          {role === "student" &&
            isPurchased &&
            course.googleClassroomLink !== null && (
              <Button
                className="bg-white hover:bg-zinc-300 font-semibold text-black"
                onClick={() =>
                  router.push(
                    `${course.googleClassroomLink}?cjc=${course.googleClassroomJoinLink}`
                  )
                }
              >
                Google Classroom
              </Button>
            )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generating Certificate</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="py-2 flex items-center justify-between">
              <span>Quiz:</span>
              <div className="flex items-center w-3/4">
                <Progress
                  value={getProgressValue.f5 == 1 ? 100 : 0}
                  className="w-full"
                />
                <span className="ml-2">
                  {getProgressValue.f5 == 1 ? 100 : 0}%
                </span>
              </div>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span>Class Attendance:</span>
              <div className="flex items-center w-3/4">
                <Progress value={getProgressValue.f4} className="w-full" />
                <span className="ml-2">{getProgressValue.f4}%</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                genCert();
              }}
              disabled={
                parseInt(getProgressValue.f4) < 50 || getProgressValue.f5 < 1
              }
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
