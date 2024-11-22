"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    CourseName: "",
    CourseDesc: "",
    course_price: "",
    Diff: "",
    courseDuration: "",
    enrollment_deadline: "",
  });

  // Fetch courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/getCourses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  // Handle course submission
  const handleSubmitCourse = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/createCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response) {
        const createdCourse = await response.json();
        setCourses((prevCourses) => [...prevCourses, createdCourse]); // Add new course to the list
        setShowModal(false);
        setNewCourse({
          CourseName: "",
          CourseDesc: "",
          course_price: "",
          Diff: "",
          courseDuration: "",
          enrollment_deadline: "",
        });
      } else {
        console.error("Error creating course:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">My Courses</h3>
          <Button onClick={() => setShowModal(true)}>+ Create Course</Button>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={course.id || `${course.course_id}-${index}`} className="bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-primary font-bold">{course.course_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Price: ${course.course_price}</p>
                <p className="text-sm text-gray-500">Difficulty: {course.difficulty}</p>
                <p className="text-sm text-red-600">Deadline: {new Date(course.enrollment_deadline).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for Creating a Course */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Create a New Course</h3>
              <form onSubmit={handleSubmitCourse}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Course Name</label>
                  <input
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
                  <textarea
                    name="CourseDesc"
                    value={newCourse.CourseDesc}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
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
                <div className="flex justify-end space-x-2">
                  <Button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 text-black">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white">
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