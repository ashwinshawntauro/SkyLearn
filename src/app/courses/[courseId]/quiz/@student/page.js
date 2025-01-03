"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "../../loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Router, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const QuizApp = () => {
  const course_id = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = AuthContext();
  const [questions, setQuestions] = useState([]);
  const [stage, setStage] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    const disableCopy = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("copy", disableCopy);
    const disableTextSelection = document.documentElement.style;
    disableTextSelection.userSelect = "none";

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("copy", disableCopy);
      disableTextSelection.userSelect = "";
    };
  }, []);

  useEffect(() => {
    if (course_id) {
      const fetchQuizData = async () => {
        try {
          const res = await fetch(
            `/api/Quiz/getQuizStatus?courseId=${course_id.courseId}&userId=${userId}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.quiz_attempted) {
              setStage("attempted");
            } else {
              setStage("home");

              const resp = await fetch(
                `/api/Quiz/getQuizes/?courseId=${course_id.courseId}/quiz`,
                {
                  method: "POST",
                }
              );
              if (resp.ok) {
                const quizData = await resp.json();
                const formattedQuestions = quizData.map((q) => ({
                  question: q.question_text,
                  options: [q.choice_1, q.choice_2, q.choice_3, q.choice_4],
                  correct: q.correct_choice - 1,
                }));
                setQuestions(formattedQuestions);
                setAnswers(Array(formattedQuestions.length).fill(null));
                setTimer(formattedQuestions.length * 60);
              } else {
                console.error("Failed to fetch questions");
              }
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
  }, [course_id, userId]);

  useEffect(() => {
    const handleFullscreenExit = () => {
      if (!document.fullscreenElement && stage === "quiz") {
        toast({
          variant: "failure",
          title: "Quiz",
          description: "Quiz ended as you exited fullscreen!",
        });
        calculateAndEndQuiz();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && stage === "quiz") {
        toast({
          variant: "failure",
          title: "Quiz",
          description: "Quiz ended as you switched windows or tabs!",
        });
        calculateAndEndQuiz();
      }
    };

    const handleWindowBlur = () => {
      if (stage === "quiz") {
        toast({
          variant: "failure",
          title: "Quiz",
          description: "Quiz ended as you switched windows!",
        });
        calculateAndEndQuiz();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenExit);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [stage, answers, questions]); // Include dependencies to recalculate score when needed

  useEffect(() => {
    if (stage === "quiz" && timer === 0) {
      toast({
        variant: "failure",
        title: "Quiz",
        description: "Time's up!",
      });
      calculateAndEndQuiz();
    }
    if (stage === "quiz") {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, stage]);

  const calculateAndEndQuiz = async () => {
    const calculatedScore = answers.reduce(
      (total, answer, index) =>
        total + (answer === questions[index]?.correct ? 1 : 0),
      0
    );
    setScore(calculatedScore);
    setStage("results");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    const percentage = (calculatedScore / questions.length) * 100;

    const quizResult = {
      user_id: userId,
      course_id: parseInt(course_id.courseId, 10),
      total_score: calculatedScore,
      is_passed: calculatedScore >= Math.ceil(questions.length * 0.6),
      percentage_score: percentage.toFixed(2), // Optional: round to 2 decimal places
    };

    try {
      const res = await fetch("/api/Quiz/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizResult),
      });

      if (res.ok) {
        toast({
          variant: "success",
          title: "Quiz",
          description: "Done! your quiz is submitted",
        });
      } else {
        toast({
          variant: "failure",
          title: "Quiz",
          description: "Sorry! Quiz not submitted!",
        });
      }
    } catch (error) {
      console.error("Error submitting quiz results:", error);
      toast({
        variant: "failure",
        title: "Quiz",
        description:
          "There was an issue submitting your results. Please try again.",
      });
    }
  };

  const startQuiz = () => {
    if (questions.length === 0) {
      toast({
        variant: "failure",
        title: "Quiz",
        description: "No questions available to start the quiz.",
      });
      return;
    }
    document.documentElement
      .requestFullscreen()
      .then(() => setStage("quiz"))
      .catch(() =>
        toast({
          variant: "failure",
          title: "Quiz",
          description: "Please allow fullscreen mode to proceed!",
        })
      );
  };

  const handleAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index;
    setAnswers(updatedAnswers);
  };

  if (loading) {
    return <Loading />;
  }

  if (stage === "home") {
    return (
      <div className="flex flex-col items-center space-y-4 mt-10">
        <h1 className="text-3xl font-bold">Welcome to the Quiz</h1>
        <Button
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-light"
          onClick={startQuiz}
        >
          Start Test
        </Button>
      </div>
    );
  }

  if (stage === "quiz") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz</h1>

        <div className="flex justify-center space-x-2 mb-4">
          {questions.map((_, index) => (
            <Button
              key={index}
              className={`py-2 px-4 rounded ${
                currentQuestion === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`block w-full text-left py-2 px-4 rounded mb-2 ${
                answers[currentQuestion] === index
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            className="bg-gray-500 text-black py-2 px-4 rounded hover:bg-gray-600"
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <p className="text-lg font-bold">
            Time Remaining: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </p>
          <Button
            className="bg-gray-500 text-black py-2 px-4 rounded hover:bg-gray-600"
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(prev + 1, questions.length - 1)
              )
            }
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </Button>
        </div>

        <Button
          className="mt-4 bg-red-500 font-semibold text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={calculateAndEndQuiz}
        >
          Submit
        </Button>
      </div>
    );
  }
  if (stage === "attempted") {
    return (
      <div className="flex flex-col items-center space-y-4 mt-10">
        <h1 className="text-3xl font-bold text-primary">
          Quiz Already Attempted
        </h1>
        <p className="text-lg">
          You have already submitted this quiz. Retaking is not allowed.
        </p>
        <Button
          onClick={() => router.replace(`/courses/${course_id.courseId}`)}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  if (stage === "results") {
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-primary mb-6">Quiz Results</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {score} / {questions.length}
            </div>
            <Progress
              value={(score / questions.length) * 100}
              className="h-3 mb-2"
            />
            <p className="text-sm text-muted-foreground">
              You got {((score / questions.length) * 100).toFixed(1)}% correct
            </p>
          </CardContent>
        </Card>
        <div className="space-y-6">
          {questions.map((q, index) => (
            <Card
              key={index}
              className={
                answers[index] === q.correct
                  ? "border-green-500"
                  : "border-red-500"
              }
            >
              <CardHeader>
                <CardTitle className="flex items-start gap-2">
                  {answers[index] === q.correct ? (
                    <CheckCircle className="text-green-500 mt-1" />
                  ) : (
                    <XCircle className="text-red-500 mt-1" />
                  )}
                  <span>Q: {q.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <span className="font-semibold">Your Answer: </span>
                    <span
                      className={
                        answers[index] === q.correct
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {q.options[answers[index]] || "Not Answered"}
                    </span>
                  </div>
                  {answers[index] !== q.correct && (
                    <div>
                      <span className="font-semibold">Correct Answer: </span>
                      <span className="text-green-600">
                        {q.options[q.correct]}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          className="mt-5"
          onClick={() => router.push(`/courses/${course_id.courseId}`)}
        >
          Return to Course
        </Button>
      </div>
    );
  }

  return null;
};

export default QuizApp;
