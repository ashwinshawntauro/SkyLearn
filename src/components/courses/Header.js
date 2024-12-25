'use client'

import { AuthContext } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation';

function Header({ course }) {
  const { role ,userId} = AuthContext()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPurchased, setIsPurchased] = useState(null);
  const [isTutor, setIsTutor] = useState(null);
  const router = useRouter()
  const endCourse = async () => {
    try {
      const response = await fetch("/api/endCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.course_id,
        }),
      })
      if (response.ok) {
        alert("Course has been ended")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const generateCertificate = () => {
    setIsModalOpen(true);
    setProgress(0);
  }

  useEffect(() => {
    const initializeData = async () => {
      if (!userId) return;
      try {
        // Check if user is enrolled
        const enrollRes = await fetch(`/api/getEnroll?student_id=${encodeURIComponent(userId)}`);
        const enrollData = await enrollRes.json();
        const isEnrolled = (enrollData.getEnroll || []).some(
          (course) => course.course_id === courseId
        );
        setIsPurchased(isEnrolled);

        // Check if user is tutor
        if (role === "teacher") {
          const tutorRes = await fetch(`/api/getTutorCourses?tutorId=${userId}`);
          const tutorData = await tutorRes.json();
          setIsTutor(tutorData.some(course => course.course_id === courseId));
        } else {
          setIsTutor(false);
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    initializeData()
  }, [])

  return (
    <div className="bg-primary text-white py-8 px-8 rounded-sm">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-4">{course.course_name}</h1>
        <span className="mb-4 font-extralight">{course.course_description}</span>
      </div>
      {role === "teacher" && isTutor &&
        <div className='inline-flex relative top-6 w-full justify-between'>
          <Button className="bg-white hover:bg-zinc-300 font-semibold text-black" onClick={() => router.push(`${course.course_id}/classroom`)}>
            Classroom Manager
          </Button>
          <Button className="bg-white hover:bg-zinc-300 text-black font-semibold" onClick={endCourse}>
            End Course
          </Button>
        </div>
      }
      <div className='inline-flex relative top-3 justify-between w-full mt-2'>
        {role === "student" && course.status === 'ended' && isPurchased &&
          <Button className="bg-white hover:bg-zinc-300 font-semibold text-black" onClick={generateCertificate}>
            Generate Certificate
          </Button>
        }
        {role === "student" && isPurchased &&
          <Button className="bg-white hover:bg-zinc-300 font-semibold text-black" onClick={() => router.push(`${course.googleClassroomLink}?cjc=${course.googleClassroomJoinLink}`)}>
            Join Classroom
          </Button>
        }
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generating Certificate</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Progress value={progress} className="w-full" />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)} disabled={progress < 85}>
              {progress < 85 ? 'Not Eligible' : 'Generate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

