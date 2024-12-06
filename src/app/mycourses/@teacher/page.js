"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [newCourse, setNewCourse] = useState({
    CourseName: "",
    CourseDesc: "",
    course_price: "",
    Diff: "",
    courseDuration: "",
    enrollment_deadline: "",
  });

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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  const updateClassroom = async (course, googleClassroomId, googleClassroomJoinLink) => {
    try {
      const updateResponse = await fetch("/api/updateClassroom", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.course_id,
          googleClassroomId: googleClassroomId,
          googleClassroomJoinLink: googleClassroomJoinLink,
        }),
      });

      if (updateResponse.ok) {
        alert("Course updated with Google Classroom ID and join link");
      } else {
        alert("Failed to update course with classroom details");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating or updating the classroom");
    }
  };

  const handleCreateClassroom = async (course) => {
    try {
      const response = await fetch("/api/createClassroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          accessToken,
          name: course.course_name,
          section: course.course_description,
          descriptionHeading: course.course_name,
          description: course.course_desc,
          room: String(course.course_id),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Click at Grant Permission");
        return
      }
      const data = await response.json();
      const googleClassroomJoinLink = `https://classroom.google.com/c/${data.id}`;
      // console.log(googleClassroomJoinLink)
      updateClassroom(course, data.id, googleClassroomJoinLink);
      alert("Course created in Google Classroom:", data);
    } catch (error) {
      console.error("Error creating Google Classroom course:", error);
      alert(error.message || "Error creating course in Google Classroom");
    }
  };

  const authenticateToken = async () => {
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=128899871237-aip8s1bp02dd3bhtc77q38eo3hidlhjj.apps.googleusercontent.com&redirect_uri=http://localhost:3000/mycourses&scope=https://www.googleapis.com/auth/classroom.courses&prompt=select_account`;
    window.location.href = oauthUrl;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleSubmitAndRequestOAuth = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/createCourse", {
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

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch("/api/deleteCourse", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: courseId }),
      });

      if (response.ok) {
        alert("Course Deleted");
      } else {
        // Optionally handle non-200 status codes
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
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
            <Button onClick={authenticateToken} className="bg-blue-600">Grant Classroom Permission</Button>
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
                <p className="text-sm text-gray-500">Price: ${course.course_price}</p>
                <p className="text-sm text-gray-500">Difficulty: {course.difficulty}</p>
                <p className="text-sm text-red-600">Deadline: {new Date(course.enrollment_deadline).toLocaleDateString()}</p>
                {course.googleClassroomId ? (
                  <Button
                    className="mt-2 mx-2"
                    onClick={() => window.open(`https://classroom.google.com/c/${course.googleClassroomId}`, "_blank")}
                  >
                    Go to Google Classroom
                  </Button>
                ) : (
                  <Button
                    className="mt-2 mx-2"
                    onClick={() => handleCreateClassroom(course)}
                  >
                    Create Google Classroom
                  </Button>
                )}
                <Button className="mt-2 mx-2 bg-red-600 hover:bg-red-500" onClick={() => deleteCourse(course.course_id)}>Delete Course</Button>
              </CardContent>
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
