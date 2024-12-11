import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InstructorSection from "@/components/courses/InstructorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/providers/AuthProvider";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TutorLivestream from "@/components/courses/tutor/TutorLivestream";
import QuizForm from "./tutor/TutorQuiz";
import TutorNotes from "@/components/courses/tutor/TutorNotes";
import LivestreamStatus from "./student/livestreamStatus"
import ClassSupp from "./tutor/ClassSupp"
import { Form } from "../ui/form";
import { Textarea } from "../ui/textarea";

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


  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const [questions, setQuestions] = useState([]);
  const gemini = async (userQuestion) => {
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyDhiQ6NBSbzNP4dEWMKyzaE97oVdeASbO0"
      );
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
        const courseExists = enrolledCourses.some(
          (course) => course.course_id === courseId
        );
        setIsPurchased(courseExists);
      } else {
        console.error("Failed to fetch enrollments:", res.status);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
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
    const fetchNotes = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/uploadNotes?courseId=${courseId}`);
        const data = await response.json();

        if (response.ok) {
          setNotes(data);
        } else {
          setError(data.error || "Failed to fetch notes.");
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("An error occurred while fetching notes.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchNotes();
  }, [courseId]);

  useEffect(() => {
    if (userId) {
      getEnroll(userId);
      if (role == "teacher") {
        getTutor(userId);
      } else {
        setIsTutor(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (courseId) {
      const fetchQuizData = async () => {
        try {
          const resp = await fetch(`/api/getQuizes?courseId=${courseId}`, {
            method: "POST",
          });

          if (resp.ok) {
            const quizData = await resp.json();

            if (quizData.error) {
              console.error(quizData.error);
              return;
            }

            const formattedQuestions = quizData.map((q) => ({
              question: q.question_text,
              options: [q.choice_1, q.choice_2, q.choice_3, q.choice_4],
              correct: q.correct_choice - 1, // Assuming correct_choice is 1-indexed
            }));
            setQuestions(formattedQuestions);

            console.log(formattedQuestions);
          } else {
            console.error("Failed to fetch questions");
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };
      fetchLivestreams();
      fetchQuizData();
    }
  }, [courseId, userId]);

  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const res = await fetch(`/api/getLeaderboard?course_id=${courseId}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboardData(data.leaderboardInfo || []);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };
  const fetchLivestreams = async () => {
    try {
      const response = await fetch("/api/getLivestreams");
      const data = await response.json();
      const filteredLivestreams = data.filter(
        (livestream) => livestream.course_id === courseId
      );

      setLivestreams(filteredLivestreams);
      console.log(livestreams);
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
    } catch (error) {
      console.error("Error submitting duration:", error);
    }
  };

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
              setQuizStatus(true);
            } else {
              setQuizStatus(false);
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

  // const generateToken = async (courseId, livestreamId) => {
  //   try {
  //     const res = await fetch('/api/generateToken', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ courseId, livestreamId }),
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(`${courseId}`, data.token);
  //       // getToken(data.token);
  //     } else {
  //       console.error('Failed to generate token');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching token:', error);
  //   }
  // };


  const getToken = async (courseId, livestreamId) => {
    try {
      const response = await fetch(`/api/getToken?courseId=${courseId}&livestreamId=${livestreamId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataToken = await response.json();

      if (response.ok) {
        return dataToken.count
      }
    } catch (error) {
      console.error("Error creating livestream:", error);
    }
  }

  return (
    <div>
      {isPurchased || isTutor ? (
        <Tabs
          defaultValue="livestreams"
          className="w-full p-2 bg-gray-100 h-auto"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="livestreams">Livestreams</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            {isPurchased ? (
              <TabsTrigger value="askAi">Ask AI</TabsTrigger>
            ) : (
              <TabsTrigger value="gclass">Google Classroom</TabsTrigger>
            )}
          </TabsList>

          <TabsContent
            value="livestreams"
            className="p-2 max-w-full lg:flex flex-col gap-3"
          >
            {isPurchased ? (
              <div>
                {livestreams.map((livestream) => (
                  <div
                    key={livestream.id}
                    className="border-r border-b mb-2 border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between leading-normal"
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
                      <div className="flex items-center space-x-2">
                        <LivestreamStatus livestreamId={livestream.id} userId={userId} course_id={course} />
                      </div>
                    </div>
                    {livestream.status === "active" && (
                      <Button
                        onClick={() =>
                          router.push(`${courseId}L${livestream.id}/livestream`)
                        }
                        className="flex items-center mx-2 w-fit h-1/2 text-nowrap bg-primary px-3 rounded-lg text-white hover:bg-primary-light"
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
                    <div>
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
                          {(() => {
                            const tokenCount = getToken(courseId, livestream.id); // Call getToken once and store the result
                            return tokenCount > 0 ? (
                              <div>
                                <span>{tokenCount}</span>
                                <ClassSupp />
                              </div>
                            ) : (
                              <span>{tokenCount}</span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                    {livestream.status === "active" && (
                      <div className="grid grid-flow-col">
                        <Button
                          onClick={() =>
                            router.push(
                              `${courseId}L${livestream.id}/livestream`
                            )
                          }
                          className="flex w-full items-center mx-2 w-full text-nowrap bg-primary px-3 text-white hover:bg-primary-light"
                        >
                          Join Class
                        </Button>
                        <Button
                          onClick={() => endLive(livestream.id)}
                          className="flex items-center mx-2 w-fit text-nowrap bg-red-600 px-3 rounded-lg text-white hover:bg-red-800"
                        >
                          End Live
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="p-2">
            {isTutor ? (
              <>
                <TutorNotes courseId={courseId} />
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="border p-4 rounded-lg">
                      <h3 className="text-lg font-bold">{note.note_title}</h3>
                      <p className="mt-2">{note.note_text}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="border p-4 rounded-lg">
                    <h3 className="text-lg font-bold">{note.note_title}</h3>
                    <p className="mt-2">{note.note_text}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="p-2">
            {isTutor ? (
              <>
                {/* Display QuizForm for Tutor */}
                <QuizForm courseId={courseId} />

                {/* Display the questions if they exist */}
                <div>
                  {questions.length === 0 ? (
                    <p>No quizzes available for this course.</p>
                  ) : (
                    questions.map((question, index) => (
                      <div key={index} className="border-b border-grey-light py-4">
                        <div className="font-bold text-lg">{question.question}</div>
                        <div className="font-bold text-lg text-green-600 mt-2">
                          Correct Answer: {question.options[question.correct]}
                        </div>

                        <div className="mt-2">
                          {question.options.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`question-${index}`}
                                id={`question-${index}-option-${idx}`}
                                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                disabled
                              />
                              <label
                                htmlFor={`question-${index}-option-${idx}`}
                                className="text-sm text-gray-700"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                {/* For Non-Tutors */}
                {questions.length === 0 ? (
                  <div>No quizzes available for this course.</div>
                ) : (
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
                        Challenge your knowledge with this engaging quiz! Test your
                        skills, new concepts, and push your limits. This quiz will
                        provide an exciting and rewarding experience.
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push(`/courses/${courseId}/quiz`)}
                      className="flex items-center mx-2 w-fit text-nowrap bg-primary px-3 rounded-lg text-white hover:bg-primary-light"
                    >
                      {quizStatus ? "Already Attempted" : "Attempt Quiz"}
                    </Button>
                  </div>
                )}
              </>
            )}
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
                    <TableCell>
                      {entry.STUDENT?.student_name ||
                        `Student ${entry.student_id}`}
                    </TableCell>{" "}
                    <TableCell>{entry.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {isPurchased ? (
            <TabsContent value="askAi" className="p-2">
              <Form
                onSubmit={handleQuestionSubmit}
                className="flex flex-col space-y-4"
              >
                <Textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full bg-white p-2 border rounded-md focus:border-none focus:outline-none"
                  rows="4"
                />
                <div className="w-full flex justify-end">
                  <Button
                    type="submit"
                    className="px-4 py-2 my-2 bg-primary text-white rounded-md"
                  >
                    <p className="px-1 font-sans">Ask AI</p>
                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185" />
                    </svg>
                  </Button>
                </div>
              </Form>
              {aiResponse && (
                <div className="mt-4 p-4 bg-gray-200 rounded-md">
                  <h4 className="font-semibold text-lg mb-2">Explanation:</h4>
                  <div className="space-y-3 leading-relaxed text-gray-800">
                    {aiResponse.split("\n").map((line, index) => (
                      <div key={index} className="mb-2">
                        {line.startsWith("**") ? (
                          <p className="font-bold text-blue-600">
                            {line.replace(/\*\*/g, "")}
                          </p>
                        ) : line.startsWith("* ") ? (
                          <li className="list-disc list-inside ml-4">
                            {line.replace("* ", "")}
                          </li>
                        ) : (
                          <p>{line}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ) : (
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
            </TabsContent>
          )}
        </Tabs>
      ) : isPurchased == false && isTutor == false ? (
        <Tabs
          defaultValue="instructors"
          className="w-full p-2 bg-gray-100 h-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructors">Instructor</TabsTrigger>
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
      )}
    </div>
  );
}

export default NavigationTabs;
