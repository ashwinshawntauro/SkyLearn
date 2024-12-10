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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import TutorLivestream from "@/components/courses/tutor/TutorLivestream"
import QuizForm from "./tutor/TutorQuiz"
import LivestreamStatus from "./student/livestreamStatus"
import jwt from 'jsonwebtoken';

function NavigationTabs({ course }) {
  const router = useRouter();
  const { userId, userName, role } = AuthContext();
  const courseId = course.course_id;
  const [livestreams, setLivestreams] = useState([]);
  const [isPurchased, setIsPurchased] = useState(null);
  const [isTutor, setIsTutor] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [quizStatus, setQuizStatus] = useState(false);
  const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';


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
      if (res.ok) {
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
  const getTutor = async (userId) => {
    try {
      const response = await fetch(`/api/getTutorCourses?tutorId=${userId}`);
      const data = await response.json();
      const matchingCourse = data.find(
        (course) => course.course_id === courseId
      );
      if (matchingCourse) {
        setIsTutor(true);
      } else {
        setIsTutor(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getEnroll(userId);
      if (role == 'teacher') { getTutor(userId) }
      else {
        setIsTutor(false)
      }
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
  const fetchLivestreams = async () => {
    try {
      const response = await fetch("/api/getLivestreams");
      const data = await response.json();
      setLivestreams(data);
    } catch (error) {
      console.error("Error fetching livestreams:", error);
    }
  };
  const endLive = async (streamId) => {
    try {
      const response = await fetch("/api/updateLiveEnd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          livestreamId: streamId,
        }),
      });

      if (response.ok) {
        alert("Livestream ended");
      }
      else {
        console.log(response)
      }
    } catch (error) {
      console.error("Error submitting duration:", error);
    }
  }

  useEffect(() => {
    fetchLeaderboardData();
    fetchLivestreams();
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      const fetchQuizData = async () => {
        try {
          const res = await fetch(
            `/api/getQuizStatus?courseId=${courseId}&userId=${userId}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.quiz_attempted) {
              setQuizStatus(true); // Set stage to prevent retaking
            } else {
              setQuizStatus(false); // Set stage to prevent retaking
            }
          } else {
            console.error("Failed to fetch quiz status");
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuizData();
    }
  }, [courseId, userId]);

  useEffect(()=>{
    
  })
  const generateToken = async (courseId, livestreamId) => {
    try {
      const res = await fetch('/api/generateToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, livestreamId }),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Generated Token:', data.token);
        // getToken(data.token);
      } else {
        console.error('Failed to generate token');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };
  

  const getToken = async (token) => {
    try {
      const response = await fetch(`/api/getToken?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataToken = await response.json();

      if (response.ok) {
        console.log(dataToken);
      }
    } catch (error) {
      console.error("Error creating livestream:", error);
    }
  }

  return (
    <div>
      {isPurchased || isTutor ? (
        <Tabs defaultValue="livestreams" className="w-full p-2 bg-gray-100 h-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="livestreams">Livestreams</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            {isPurchased ? (<TabsTrigger value="askAi">Ask AI</TabsTrigger>) : (<TabsTrigger value="gclass">Google Classroom</TabsTrigger>)}
          </TabsList>

          <TabsContent value="livestreams" className="p-2 max-w-full lg:flex flex-col gap-3">
            {isPurchased ? (<div>
              {livestreams.map((livestream) => (
                <div
                  key={livestream.id}
                  className="border mb-2 border-gray-300 rounded-lg p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white transition-shadow duration-300"
                >
                  <div className="w-full lg:w-3/4">
                    <div className="flex items-center mb-2">
                      {livestream.status === "active" && (
                        <span className="bg-red-100 animate-blink text-red-800 text-xs font-medium px-2 py-1 rounded border border-red-400 mr-2">
                          Live
                        </span>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900">{livestream.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{livestream.description}</p>
                    <div className="flex items-center space-x-2">
                      <LivestreamStatus livestreamId={livestream.id} userId={userId} course_id={course} />
                    </div>
                  </div>
                  {livestream.status === "active" && (
                    <Button
                      onClick={() => router.push(`${courseId}L${livestream.id}/livestream`)}
                      className="py-14 flex h-full lg:mt-0 lg:ml-4 px-4 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light"
                      style={{ height: '100%' }} // Ensure the button stretches to the full height of its container
                    >
                      Join Class
                    </Button>
                  )}
                </div>
              ))}
            </div>
            ) : isTutor ? (
              <div>
                <TutorLivestream courseId={courseId} tutorId={userId} />
                {livestreams.map((livestream) => (
                  <div
                    key={livestream.id}
                    className="border-r mb-2 border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between leading-normal"
                  >
                    <div className="">
                      <div className="mb-2">
                        {livestream.status === "active" && (
                          <span className="bg-red-100 animate-blink text-red-800 text-sm me-2 px-2.5 py-0.5 rounded border border-red-400">
                            Live
                          </span>
                        )}
                      </div>
                      <div className="text-black font-bold text-xl mb-2">
                        {livestream.title}
                      </div>
                      <p className="text-grey-darker text-base">
                        {livestream.description}
                      </p>
                      <div className="flex items-center">
                        <div className="text-sm my-4">
                          <p className="text-primary leading-none">Tokens Raised</p>
                          {generateToken(courseId, livestream.id)}
                        </div>
                      </div>
                    </div>
                    {livestream.status === "active" && (
                      <div className="flex flex-col">
                        <Button
                          onClick={() =>
                            router.push(
                              `${courseId}L${livestream.id}/livestream`
                            )
                          }
                          className="flex py-10 items-center mx-2 w-full text-nowrap bg-primary px-3 text-white hover:bg-primary-light"
                        >
                          Join Class
                        </Button>
                        <Button onClick={() => endLive(livestream.id)} className="flex py-10 w-full items-center mx-2 text-nowrap bg-red-600 px-3 text-white hover:bg-red-800">End Live</Button>
                      </div>

                    )}
                  </div>
                ))}
              </div>
            ) :
              (<div></div>)
            }
          </TabsContent>

          <TabsContent value="notes" className="p-2">
            Module 1,2,3,4,5 notes
          </TabsContent>

          <TabsContent value="quizzes" className="p-2">
            <QuizForm courseId={courseId} />
            <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between leading-normal">
              <div>
                <div className="mb-2">
                  {quizStatus || (
                    <span className="bg-red-100 animate-blink text-red-800 text-sm me-2 px-2.5 py-0.5 rounded border border-red-400">
                      Live
                    </span>
                  )}
                </div>
                <div className="text-black font-bold text-xl mb-2">Quiz</div>
                <p className="text-grey-darker text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <Button
                onClick={() => router.push(`/courses/${courseId}/quiz`)}
                className="flex items-center mx-2 w-fit text-nowrap bg-primary px-3 rounded-lg text-white hover:bg-primary-light"
              >
                {quizStatus ? "Already Attempted" : "Attempt Quiz"}
              </Button>
            </div>
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

          {isPurchased ? (<TabsContent value="askAi" className="p-2">
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
          </TabsContent>) : (
            <TabsContent value="gclass" className="p-2">
              <div className="flex items-center space-x-4">
                <Label htmlFor="gclass-code" className="font-medium">
                  Google Classroom Code:
                </Label>
                <Input
                  id="gclass-code"
                  type="text"
                  placeholder="Enter share code"
                  className="w-1/2"
                />
              </div>
            </TabsContent>)}

        </Tabs>
      ) : isPurchased == false && isTutor == false ? (
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
      ) : (
        <Skeleton className="w-full mt-2 h-[250px] rounded-lg" />
      )
      }
    </div>
  );
}

export default NavigationTabs;