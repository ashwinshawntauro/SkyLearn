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
import { useToast } from "@/hooks/use-toast";

export default function Page({ courseId, tutorId ,fetchLivestreams}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
    time: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDatetimeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, datetime: value }));
  };
  const handleTimeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, time: value }));
  };

  const handleCreateLivestream = async () => {
    const reqBody = {
      ...formData,
      status: "inactive",
      course_id: courseId,
      tutor_id: tutorId,
    };
    try {
      const response = await fetch("/api/Livestreams/createLivestream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "SkyLearn",
          description: "Livestream created!",
        })
        fetchLivestreams()
        setIsDialogOpen(false);
      } else {
        toast({
          variant: "failure",
          title: "SkyLearn",
          description: "Sorry! Couldnt create livestream",
        })
      }
    } catch (error) {
      console.error("Error creating livestream:", error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Sorry! There was an issue",
      })
    }
  };

  return (
    <div className="py-2 flex justify-end">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-primary flex justify-end text-white px-4 py-2 rounded-lg hover:bg-primary-light"
            onClick={() => setIsDialogOpen(true)}
          >
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
              value={formData.datetime}
              onChange={handleDatetimeChange}
              className="border px-2 py-1"
              required
            />
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleTimeChange}
              className="border px-2 py-1"
              required
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateLivestream} className="bg-primary-light">
              Create Livestream
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
