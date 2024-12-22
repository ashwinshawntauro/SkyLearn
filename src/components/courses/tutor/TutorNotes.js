"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page({ courseId }) {
  const [formData, setFormData] = useState({
    noteTitle: "",
    noteText: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNote = async () => {
    const { noteTitle, noteText } = formData;

    // Input validation
    if (!noteTitle || !noteText) {
      setMessage("Note title and text are required.");
      return;
    }

    const reqBody = {
      courseId, // Pass the courseId
      noteTitle,
      noteText,
    };

    try {
      setLoading(true); 

      const response = await fetch("/api/uploadNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Note uploaded successfully!");
        setFormData({ noteTitle: "", noteText: "" }); // Reset the form
        setIsDialogOpen(false); // Close the dialog after submission
      } else {
        setMessage(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error uploading note:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false once done
    }
  };

  return (
    <div className="py-2 flex justify-end">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light">
            Upload Note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              name="noteTitle"
              value={formData.noteTitle}
              onChange={handleChange}
              placeholder="Enter note title"
              required
            />
            <Textarea
              name="noteText"
              value={formData.noteText}
              onChange={handleChange}
              placeholder="Enter note content"
              required
            />
          </div>
          <DialogFooter>
          <Button
              onClick={handleSubmitNote}
              className="bg-primary-light"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                            <svg
                              className="w-5 h-5 animate-spin text-white"
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
                            <span>Submitting...</span>
                          </div>              ) : (
                "Submit Note"
              )}
              {/* Show spinner if loading */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {message && (
        <p
          className={`mt-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
