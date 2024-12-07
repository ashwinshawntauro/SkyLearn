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
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton"


function NavigationTabs({ course }) {
  const router = useRouter();
  const { userId, userName } = AuthContext();
  const courseId = course.course_id;

  const [isPurchased, setIsPurchased] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const gemini = async (userQuestion) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDhiQ6NBSbzNP4dEWMKyzaE97oVdeASbO0");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `My name is ${userName}.You are an expert tutor on ${course.course_name}.Your Course desciption is ${course.course_description}. A student asked: "${userQuestion}".
        Please explain the concept in a clear, step-by-step manner. Use simple language and examples where possible.
        Break down complex ideas into easily understandable parts and make sure the student can grasp the main ideas.`;
      const result = await model.generateContent(prompt);
      setAiResponse(result ? result.response.text() : "No response received");
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


  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const res = await fetch(`/api/getLeaderboard?course_id=${courseId}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboardData(data.leaderboardInfo || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [courseId]);

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

          <TabsContent value="livestreams" className="p-2 max-w-full lg:flex flex-col gap-3">
            <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between leading-normal">
              <div className="">
                <div className="mb-2">
                  <span className="bg-red-100 animate-blink text-red-800 text-sm me-2 px-2.5 py-0.5 rounded border border-red-400">
                    Live
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-sm me-2 px-2.5 py-0.5 rounded border border-blue-400">Module 1</span>
                </div>
                <div className="text-black font-bold text-xl mb-2">Intro to this Subject</div>
                <p className="text-grey-darker text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                <div className="flex items-center">
                  <div className="text-sm my-4">
                    <p className="text-primary leading-none">Jonathan Reinink</p>
                    <p className="text-gray-500">Aug 18</p>
                  </div>
                </div>
              </div>
              <Button onClick={(e) => router.push(`${courseId}/livestream`)} className="flex items-center mx-2 w-fit text-nowrap bg-primary px-3 rounded-lg text-white hover:bg-primary-light">
                Join Class
              </Button>
            </div>
            <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between leading-normal">
              <div className="">
                <div className="mb-2">
                  <span className="bg-blue-100 text-blue-800 text-sm me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Module 1</span>
                </div>
                <div className="text-black font-bold text-xl mb-2">Intro to this Subject</div>
                <p className="text-grey-darker text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                <div className="flex items-center">
                  <div className="text-sm my-4">
                    <p className="text-primary leading-none">Jonathan Reinink</p>
                    <p className="text-gray-500">Aug 18</p>
                  </div>
                </div>
              </div>
            </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry, index) => (
                  <TableRow key={entry.student_id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{entry.STUDENT?.student_name || `Student ${entry.student_id}`}</TableCell> {/* Display student_name or fallback to student_id */}
                    <TableCell>{entry.score}</TableCell>
                  </TableRow>
                ))}
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
                <div className="space-y-3 leading-relaxed text-gray-800">
                  {aiResponse.split('\n').map((line, index) => (
                    <div key={index} className="mb-2">
                      {line.startsWith("**") ? (
                        <p className="font-bold text-blue-600">{line.replace(/\*\*/g, '')}</p>
                      ) : line.startsWith("* ") ? (
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
      ) : isPurchased==false ? (
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
        ): (
          <Skeleton className="w-full mt-2 h-[250px] rounded-lg" />
        )
      }
    </div>
  );
}

export default NavigationTabs;