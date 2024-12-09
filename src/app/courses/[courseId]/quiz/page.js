"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

const QuizApp = () => {
  const course_id = useParams();
  const {userId} = AuthContext()
  const [questions, setQuestions] = useState([]); // Store fetched questions
  const [stage, setStage] = useState(); // Stages: home, quiz, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // Initialize after questions load
  const [timer, setTimer] = useState(0); // 10 minutes in seconds
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state for questions

  // Fetch questions from API
  useEffect(() => {
    // Disable right-click and text selection
    const disableContextMenu = (e) => e.preventDefault();
    const disableCopy = (e) => e.preventDefault();

    document.addEventListener("contextmenu", disableContextMenu); // Disable right-click
    document.addEventListener("copy", disableCopy); // Disable copying
  
    
    // Disable text selection via CSS
    const disableTextSelection = document.documentElement.style;
    disableTextSelection.userSelect = "none"; // Disable text selection for all elements

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("copy", disableCopy);
      disableTextSelection.userSelect = ""; // Re-enable text selection on cleanup
    };
  }, []);

  useEffect(() => {
    if (course_id) {
      const fetchQuizData = async () => {
        try {
          const res = await fetch(`/api/getQuizStatus?courseId=${course_id.courseId}&userId=${userId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.quiz_attempted) {
              setStage("attempted"); // Set stage to prevent retaking
            } else {
              setStage("home"); // Set stage to prevent retaking

              const resp = await fetch(`/api/getQuizes/?courseId=${course_id.courseId}/quiz`, {
                method: "POST",
              });
              if (resp.ok) {
                const quizData = await resp.json(); // Correct variable name to avoid conflicts
                const formattedQuestions = quizData.map((q) => ({
                  question: q.question_text,
                  options: [q.choice_1, q.choice_2, q.choice_3, q.choice_4],
                  correct: q.correct_choice - 1, // Assuming correct_choice is 1-indexed
                }));
                setQuestions(formattedQuestions);
                setAnswers(Array(formattedQuestions.length).fill(null)); // Initialize answers
                setTimer(formattedQuestions.length * 60); // Timer is based on the number of questions (minutes)
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
  }, [course_id,userId]);
  

  // Handle fullscreen and window switching
  useEffect(() => {
    const handleFullscreenExit = () => {
      if (!document.fullscreenElement && stage === "quiz") {
        alert("Quiz ended as you exited fullscreen!");
        calculateAndEndQuiz();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && stage === "quiz") {
        alert("Quiz ended as you switched windows or tabs!");
        calculateAndEndQuiz();
      }
    };

    const handleWindowBlur = () => {
      if (stage === "quiz") {
        alert("Quiz ended as you switched windows!");
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

  // Timer logic
  useEffect(() => {
    if (stage === "quiz" && timer === 0) {
      alert("Time's up!");
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
  
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  
    // API call to submit results
    const quizResult = {
      user_id: userId, // Replace with authenticated user's ID
      course_id: parseInt(course_id.courseId, 10), // Convert the string to an integer
      total_score: calculatedScore,
      is_passed: calculatedScore >= Math.ceil(questions.length * 0.6) // Example: 60% pass mark
    };
  
    try {
      const res = await fetch('/api/quizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizResult),
      });
  
      if (!res.ok) {
        throw new Error('Failed to submit quiz results');
      }
  
      const data = await res.json();
      console.log('Quiz result submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting quiz results:', error);
      alert('There was an issue submitting your results. Please try again.');
    }
  };
  

  

  const startQuiz = () => {
    if (questions.length === 0) {
      alert("No questions available to start the quiz.");
      return;
    }
    document.documentElement
      .requestFullscreen()
      .then(() => setStage("quiz"))
      .catch(() => alert("Please allow fullscreen to start the test."));
  };

  const handleAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index;
    setAnswers(updatedAnswers);
  };

 

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (stage === "home") {
    return (
      <div className="flex flex-col items-center space-y-4 mt-10">
        <h1 className="text-3xl font-bold">Welcome to the Quiz</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={startQuiz}
        >
          Start Test
        </button>
      </div>
    );
  }

  if (stage === "quiz") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz</h1>

        {/* Navigation by Question Numbers */}
        <div className="flex justify-center space-x-2 mb-4">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded ${
                currentQuestion === index ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Display */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`block w-full text-left py-2 px-4 rounded mb-2 ${
                answers[currentQuestion] === index
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Next and Previous Buttons */}
        <div className="flex justify-between items-center">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={() =>
              setCurrentQuestion((prev) => Math.max(prev - 1, 0))
            }
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <p className="text-lg font-bold">
            Time Remaining: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </p>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(prev + 1, questions.length - 1)
              )
            }
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={calculateAndEndQuiz}
        >
          Submit
        </button>
      </div>
    );
  }
  if (stage === "attempted") {
    return (
      <div className="flex flex-col items-center space-y-4 mt-10">
        <h1 className="text-3xl font-bold">Quiz Already Attempted</h1>
        <p className="text-lg">You have already submitted this quiz. Retaking is not allowed.</p>
      </div>
    );
  }
  

  if (stage === "results") {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Results</h1>
        <p className="text-xl mt-4">
          Your score: {score}/{questions.length}
        </p>
        <div className="mt-6 space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border p-4 rounded">
              <p className="font-semibold">Q: {q.question}</p>
              <p>
                <span className="font-semibold">Your Answer: </span>
                {q.options[answers[index]] || "Not Answered"}
              </p>
              <p>
                <span className="font-semibold">Correct Answer: </span>
                {q.options[q.correct]}
              </p>
            </div>
          ))}
        </div>
       
      </div>
    );
  }

  return null;
};

export default QuizApp;
