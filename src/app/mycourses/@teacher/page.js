"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const { userId } = AuthContext();
  const [newCourse, setNewCourse] = useState({
    tutorId: userId,
    CourseName: "",
    CourseDesc: "",
    course_price: "",
    Diff: "",
    courseDuration: "",
    enrollment_deadline: "",
    youtube_link: "",
  });

  useEffect(() => {
    fetchCourses(userId);
  }, [userId]);

  if(loading){
    <Loading/>
  }

  const fetchCourses = async (userId) => {
    try {
      const res = await fetch(`/api/Course/getTutorCourses?tutorId=${userId}`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleSubmitAndRequestOAuth = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/Course/createCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        const createdCourse = await response.json();
        setCourses((prevCourses) => [...prevCourses, createdCourse]);
        setShowModal(false);
        setNewCourse({
          CourseName: "",
          CourseDesc: "",
          course_price: "",
          Diff: "",
          courseDuration: "",
          enrollment_deadline: "",
          youtube_link: "",
        });
      } else {
        console.error("Error creating course:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch("/api/Course/deleteCourse", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: courseId }),
      });

      if (response.ok) {
        toast({
          variant: "failure",
          title: "SkyLearn",
          description: "Course Deleted!",
      })
        fetchCourses(userId)
      } else {
        const errorData = await response.json();
        console.error(errorData);
        toast({
          variant: "failure",
          title: "SkyLearn",
          description: "Sorry! Couldnt delete course",
      })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">My Courses</h3>
          <div className="gap-2 flex">
            <Button onClick={() => setShowModal(true)}>+ Create Course</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={course.id || `${course.course_id}-${index}`} className="bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-primary font-bold">{course.course_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 font-semibold">{course.course_description}</p>
                <p className="text-sm text-gray-500">Price: ₹{course.course_price}</p>
                <p className="text-sm text-gray-500">Difficulty: {course.difficulty}</p>
                <p className="text-sm text-red-600">Deadline: {new Date(course.enrollment_deadline).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter className="mt-2 flex gap-2">
                <Button
                  className="w-1/2"
                  onClick={() => router.push(`courses/${course.course_id}`)}
                >
                  Go to Course
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-1/2 bg-red-600 hover:bg-red-500">Delete Course</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this course?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteCourse(course.course_id)} className="bg-red-600 hover:bg-red-500">Yes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Create a New Course</h3>
              <form onSubmit={handleSubmitAndRequestOAuth}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Course Name</label>
                  <Input
                    type="text"
                    name="CourseName"
                    value={newCourse.CourseName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    name="CourseDesc"
                    value={newCourse.CourseDesc}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  ></Textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <Input
                    type="number"
                    name="course_price"
                    value={newCourse.course_price}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    name="Diff"
                    value={newCourse.Diff}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled>
                      Select a value
                    </option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    name="courseDuration"
                    value={newCourse.courseDuration}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Enrollment Deadline</label>
                  <input
                    type="date"
                    name="enrollment_deadline"
                    value={newCourse.enrollment_deadline}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Youtube Link</label>
                  <input
                    type="text"
                    name="youtube_link"
                    value={newCourse.youtube_link}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <Button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 w-1/2 text-black">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary w-1/2 text-white">
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}