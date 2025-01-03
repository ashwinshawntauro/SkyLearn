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
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function Page({ title, description, livestreamId, tutorId, courseId, fetchLivestreams }) {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: `Supplementary: ${title}`,
        description: description,
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
            refLiveId: livestreamId,
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
                    description: "Livestream created successfully!",
                })
                fetchLivestreams();
                setIsDialogOpen(false);
            } else {
                toast({
                    variant: "failure",
                    title: "SkyLearn",
                    description: "Please enter details correctly!",
                })
            }
        } catch (error) {
            console.error("Error creating livestream:", error);
        }
    };
    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="bg-primary text-white px-4 py-2 my-2 rounded-lg hover:bg-primary-light"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Reschedule Class
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
