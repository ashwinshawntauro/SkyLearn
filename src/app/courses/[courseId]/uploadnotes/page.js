"use client"; // Required for client-side interactivity in Next.js

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust to your actual component paths
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CourseDetailsForm() {
  const [courseName, setCourseName] = useState("");
  const [file, setFile] = useState(null); // State for the uploaded file

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]); // Update file state when a file is selected
  };

  return (
    <div className="container mx-auto p-6">
      <form
        // onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-gray-700">Upload Notes</h2>

        <div className="space-y-4">
          {/* Notes Title Input */}
          <div>
            <Label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
              Notes Title
            </Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="mt-1"
              placeholder="Enter notes title"
            />
          </div>

          {/* File Upload Input */}
          <div>
            <Label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
              Attach Notes
            </Label>
            <Input
              id="fileUpload"
              type="file"
              onChange={handleFileUpload}
              className="mt-1"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-500">
                Selected File: <strong>{file.name}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-end">
          <Button type="submit" className="mt-4">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
