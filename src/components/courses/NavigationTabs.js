import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InstructorSection from "@/components/courses/InstructorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/providers/AuthProvider";
import { GoogleGenerativeAI } from "@google/generative-ai"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function NavigationTabs({ course }) {
  const router = useRouter();
  const { userId } = AuthContext();
  const courseId = course.course_id;

  const [isPurchased, setIsPurchased] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const gemini = async (userQuestion) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDhiQ6NBSbzNP4dEWMKyzaE97oVdeASbO0");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are an expert tutor on ${course.course_name}. A student asked: "${userQuestion}".
        Please explain the concept in a clear, step-by-step manner. Use simple language and examples where possible.
        Break down complex ideas into easily understandable parts and make sure the student can grasp the main ideas.`;
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setAiResponse(result?result.response.text():"No response received");
      // console.log(aiResponse)
    } catch (error) {
      console.error("Error with Gemini API:", error);
    }
  };
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    gemini(userQuestion);
    setUserQuestion("");
  };
  const getEnroll = async (studentId) => {
    try {
      const res = await fetch(`/api/getEnroll?student_id=${encodeURIComponent(studentId)}`, {
        method: 'GET',
      });
      if (res.status === 200) {
        const data = await res.json();
        const enrolledCourses = data.getEnroll || [];
        const courseExists = enrolledCourses.some(course => course.course_id === courseId);
        setIsPurchased(courseExists);
      } else {
        console.error('Failed to fetch enrollments:', res.status);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };
  useEffect(() => {
    if (userId) {
      getEnroll(userId);
    }
  }, [userId]);
  return (
    <div>
      {isPurchased ? (
        <Tabs defaultValue="livestreams" className="w-full p-2 bg-gray-100 h-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="livestreams">Livestreams</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="askAi">Ask AI</TabsTrigger>
          </TabsList>

          <TabsContent value="livestreams" className="p-2">
            Livestreams displayed here
          </TabsContent>

          <TabsContent value="notes" className="p-2">
            Module 1,2,3,4,5 notes
          </TabsContent>

          <TabsContent value="quizzes" className="p-2">
            Quizzes
          </TabsContent>

          <TabsContent value="leaderboard" className="p-2">
            <Table className="w-full px-4 border bg-white">
              <TableCaption>{course.course_name} Leaderboard</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="text-right">Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Student X</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell className="text-right">2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="askAi" className="p-2">
            <h3>Ask Gemini</h3>
            <form onSubmit={handleQuestionSubmit} className="flex flex-col space-y-4">
              <textarea
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="w-full p-2 border rounded-md resize-none"
                rows="4"
              />
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
                Ask
              </button>
            </form>
            {aiResponse && (
              <div className="mt-4 p-4 bg-gray-200 rounded-md">
              <h4 className="font-semibold text-lg mb-2">Explanation:</h4>
              
              {/* Apply custom formatting */}
              <div className="space-y-3 leading-relaxed text-gray-800">
                {aiResponse.split('\n').map((line, index) => (
                  <div key={index} className="mb-2">
                    {/* Check if line starts with ** for bold headers */}
                    {line.startsWith("**") ? (
                      <p className="font-bold text-blue-600">{line.replace(/\*\*/g, '')}</p>
                    ) : line.startsWith("* ") ? (
                      // Format as list item if line starts with '* ' (bullet point with a space after)
                      <li className="list-disc list-inside ml-4">{line.replace("* ", "")}</li>
                    ) : (
                      <p>{line}</p>
                    )}
                  </div>
                ))}
              </div>
              </div>
            )}
          </TabsContent>

        </Tabs>
      ) :
        (
          <Tabs defaultValue="instructors" className="w-full p-2 bg-gray-100 h-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum" className="p-2">
              Course Curriculum is displayed here!
            </TabsContent>
            <TabsContent value="discussion" className="p-2">
              Live stream agenda will be displayed here.
            </TabsContent>
            <TabsContent value="review" className="p-2">
              Take down notes
            </TabsContent>
            <TabsContent value="instructors" className="p-2">
              <InstructorSection className="md:w-2/3 w-full" />
            </TabsContent>
          </Tabs>
        )}
    </div>
  );
}

export default NavigationTabs;