"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page({ courseId, tutorId }) {
    const [datetime, setDatetime] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateLivestream = async () => {
    const reqBody = {
      ...formData,
      status: "active",
      course_id: courseId,
      tutor_id: tutorId,
    };

    try {
      const response = await fetch("/api/createLivestream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Livestream created successfully!");
      } else {
        setMessage(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error creating livestream:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light">
            Create Livestream
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Livestream</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter livestream title"
              required
            />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
            <Input
              type="date"
              name="datetime"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="border px-2 py-1"
              required
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateLivestream}
              className="bg-primary-light"
            >
              Create Livestream
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {message && (
        <p className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
