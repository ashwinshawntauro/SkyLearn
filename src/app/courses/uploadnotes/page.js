"use client"; // Required for client-side interactivity in Next.js
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust to your actual component paths
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CourseDetailsForm() {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");


  return (
    // <div className="container mx-auto p-6">
    //   <form
    //     // onSubmit={handleSubmit}
    //     className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6 space-y-6"
    //   >
    //     <h1 className="text-xl font-bold">Module</h1>
    //     <h2 className="text-lg font-semibold text-gray-700">Course Details</h2>

    //     <div className="space-y-4">
    //       <div>
    //         <Label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
    //           Course Name
    //         </Label>
    //         <Input
    //           id="courseName"
    //           value={courseName}
    //           onChange={(e) => setCourseName(e.target.value)}
    //           className="mt-1"
    //           placeholder="Enter course name"
    //         />
    //       </div>

    //       <div>
    //         <Label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
    //           Course Description
    //         </Label>
    //         <Input
    //           id="courseDescription"
    //           value={courseDescription}
    //           onChange={(e) => setCourseDescription(e.target.value)}
    //           className="mt-1"
    //           placeholder="Enter course description"
    //         />
    //       </div>

    //       <div>
    //         <Label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
    //           Course Duration
    //         </Label>
    //         <Input
    //           id="courseDuration"
    //           value={courseDuration}
    //           onChange={(e) => setCourseDuration(e.target.value)}
    //           className="mt-1"
    //           placeholder="Enter course duration"
    //         />
    //       </div>
    //     </div>

    //     <div className="flex justify-end">
    //       <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
    //         Upload
    //       </Button>
    //     </div>
    //   </form>
    // </div>

  //   <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //   <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 space-y-6">
  //     <h1 className="text-2xl font-bold text-center">Module</h1>
  //     <h2 className="text-lg font-semibold text-gray-700 text-center">Course Details</h2>

  //     <div className="space-y-4">
  //       <div>
  //         <p className="text-sm font-medium text-gray-700">Course Name:</p>
  //         <p className="text-lg font-semibold text-gray-900">
  //           Introduction to Programming
  //         </p>
  //       </div>

  //       <div>
  //         <p className="text-sm font-medium text-gray-700">Course Description:</p>
  //         <p className="text-gray-700">
  //           This course covers the basics of programming, including variables, loops, and functions. These courses help you gain knowledge of basic computer terms and related software and hardware. Hardware and software, MS Word, MS PowerPoint, Security and Networking, etc. Software development courses. This course will teach you the fundamentals of web application design, development, production, and evaluation.
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex justify-end">
  //       <button
  //         type="button"
  //         className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-md"
  //       >
  //         Upload
  //       </button>
  //     </div>
  //   </div>
  // </div>

  <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <form
    className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 space-y-6"
    action="#"
    method="POST"
  >
    <h1 className="text-2xl font-bold text-center">Module</h1>
    <h2 className="text-lg font-semibold text-gray-700 text-center">Course Details</h2>

    <div className="space-y-4">
     
      <div>
        <p className="text-sm font-medium text-gray-700">Course Name:</p>
        <p className="text-lg font-semibold text-gray-900">
          
          Introduction to Programming
        </p>
      </div>

      
      <div>
        <Label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
          Course Description
        </Label>
        <textarea
          id="courseDescription"
          name="courseDescription"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="mt-1 w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
          placeholder="Enter course description"
          required
        />
      </div>
    </div>

    <div className="flex justify-end">
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-md"
      >
        Upload
      </Button>
    </div>
  </form>
</div>
  );
}
