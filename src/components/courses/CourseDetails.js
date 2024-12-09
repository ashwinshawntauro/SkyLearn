import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function CourseDetails({ course }) {
  const router = useRouter();
  const courseId = course.course_id;
  const courseAmt = course.course_price;
  const courseName = course.course_name;
  const courseDesc = course.course_description;

  const { userId,role} = AuthContext();
  const [isTutor, setIsTutor] = useState(null);
  const [isPurchased, setIsPurchased] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);
  const courseUrl = `${window.location.origin}/courses/${courseId}`;

  const handleShareCourse = async () => {
    if (navigator.share) {
      // Use Web Share API if available
      try {
        await navigator.share({
          title: `Check out this course: ${course.course_name}`,
          text: course.course_description,
          url: courseUrl,
        });
        console.log("Course shared successfully!");
      } catch (error) {
        console.error("Error sharing course:", error);
      }
    } else {
      // Fallback: Copy the link to clipboard
      try {
        await navigator.clipboard.writeText(courseUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };

  // Fetch enrolled courses for the student
  const getEnroll = async (studentId) => {
    try {
      const res = await fetch(
        `/api/getEnroll?student_id=${encodeURIComponent(studentId)}`,
        {
          method: "GET",
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        const enrolledCourses = data.getEnroll || [];
        const courseExists = enrolledCourses.some(
          (course) => course.course_id === courseId
        );
        setIsPurchased(courseExists);
      } else {
        console.error("Failed to fetch enrollments:", res.status);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };
  const getTutor = async (userId) => {
    try {
      const response = await fetch(`/api/getTutorCourses?tutorId=${userId}`);
      const data = await response.json();
      const matchingCourse = data.find(
        (course) => course.course_id === courseId
      );

      if (matchingCourse) {
        setIsTutor(true);
        setIsTutor(true);
      } else {
        setIsTutor(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getEnroll(userId);
      if (role == 'teacher') { getTutor(userId) }
      else {
        setIsTutor(false)
      }
    }
  }, [userId]);

  const handleEnroll = () => {
    const url = `/cart?courseId=${courseId}&courseName=${courseName}&courseDesc=${courseDesc}&userId=${userId}&courseAmt=${courseAmt}`;
    router.push(url);
  };

  console.log(course.youtube_link);
  return (
    <aside className="bg-white p-6 rounded-lg shadow-md">
      <div className="rounded overflow-hidden">
        <iframe
          className="w-full h-56 rounded"
          src={
            course.youtube_link
              ? course.youtube_link.includes("youtube.com/watch")
                ? course.youtube_link.replace("watch?v=", "embed/")
                : course.youtube_link
              : "https://www.youtube.com/embed/default-video-id" // Provide a fallback URL or handle the case
          }
          title="Course Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <div className="mt-6">
        <h2 className="text-4xl font-bold text-primary">
          &#8377;{course.course_price}
        </h2>
        <ul className="list-none my-4 space-y-2 text-sm">
          <li>
            Course Duration:{" "}
            <span className="font-medium">{course.course_duration}</span>
          </li>
          <li>
            Course Level:{" "}
            <span className="font-medium">{course.difficulty}</span>
          </li>
          <li>
            Students Enrolled:{" "}
            <span className="font-medium">{course.course_enrolments}</span>
          </li>
          <li>
            Language: <span className="font-medium">English</span>
          </li>
        </ul>

        {isPurchased ? (
          <Button
            disabled
            className="w-full flex justify-center bg-green-600 font-bold text-white p-2 rounded-lg group hover:bg-green-500"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                clipRule="evenodd"
              />
            </svg>
            Course Purchased
          </Button>
        ) : isTutor ? (
          <div></div>
        ) : isPurchased == false && isTutor == false ? (
          <Button
            onClick={handleEnroll}
            className="w-full flex justify-center bg-primary font-bold text-white p-2 rounded-lg group "
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                clipRule="evenodd"
              />
            </svg>
            Enroll in this Course
          </Button>
        ) : (
          <Skeleton className="w-full h-[36px] rounded-lg" />
        )}

        <Button
          onClick={handleShareCourse}
          className="w-full flex justify-center mt-2 border bg-primary group p-2 rounded-lg hover:bg-primary-light"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
          </svg>
          Share Course
        </Button>

        {copySuccess && (
          <p className="text-center mt-2 text-green-600 font-medium">
            Link copied to clipboard!
          </p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold">This Course Includes:</h3>
        <ul className="list-disc ml-5 space-y-2 mt-2 text-sm">
          <li>{course.course_duration} Lecture duration</li>
          <li>Quizzes</li>
          <li>Assignments</li>
          <li>Certificate of Completion</li>
        </ul>
      </div>
    </aside>
  );
}

export default CourseDetails;
