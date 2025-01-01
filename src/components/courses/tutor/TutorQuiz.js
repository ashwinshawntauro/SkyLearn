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

export default function Page({ courseId, fetchQuizData }) {
  const [numQuestions, setNumQuestions] = useState(1); // Number of questions to be added
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [formData, setFormData] = useState({
    questionText: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    correctChoice: "",
  });
  const [message, setMessage] = useState("");

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(parseInt(e.target.value) || 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextQuestion = () => {
    if (
      !formData.questionText ||
      !formData.choice1 ||
      !formData.choice2 ||
      !formData.choice3 ||
      !formData.choice4 ||
      !formData.correctChoice
    ) {
      setMessage("All fields are required.");
      return;
    }

    setQuestions((prev) => [
      ...prev,
      {
        question_number: currentQuestion,
        ...formData,
      },
    ]);
    setFormData({
      questionText: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      correctChoice: "",
    });

    setCurrentQuestion((prev) => prev + 1);
    setMessage("");
  };

  const handleSubmitQuiz = async () => {
    if (questions.length < numQuestions) {
      setMessage("Please complete all questions before submitting.");
      return;
    }
    console.log(courseId);
    const reqBody = {
      courseId: courseId,
      questions,
    };
    console.log(reqBody);
    try {
      const response = await fetch("/api/Quiz/createQuiz", {
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
          description: "Quiz submitted successfully!",
        });

        fetchQuizData();
        closeDialog();

        setQuestions([]);
        setCurrentQuestion(1);
      } else {
        setMessage(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="py-2 flex justify-end">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={openDialog}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light"
          >
            Create Quiz
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentQuestion === 1 && (
              <Input
                type="number"
                min="1"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                placeholder="Enter the number of questions"
                required
              />
            )}
            {currentQuestion <= numQuestions && (
              <>
                <Textarea
                  name="questionText"
                  value={formData.questionText}
                  onChange={handleChange}
                  placeholder={`Question ${currentQuestion} text`}
                  required
                />
                <Input
                  type="text"
                  name="choice1"
                  value={formData.choice1}
                  onChange={handleChange}
                  placeholder="Choice 1"
                  required
                />
                <Input
                  type="text"
                  name="choice2"
                  value={formData.choice2}
                  onChange={handleChange}
                  placeholder="Choice 2"
                  required
                />
                <Input
                  type="text"
                  name="choice3"
                  value={formData.choice3}
                  onChange={handleChange}
                  placeholder="Choice 3"
                  required
                />
                <Input
                  type="text"
                  name="choice4"
                  value={formData.choice4}
                  onChange={handleChange}
                  placeholder="Choice 4"
                  required
                />
                <Input
                  type="number"
                  name="correctChoice"
                  value={formData.correctChoice}
                  onChange={handleChange}
                  placeholder="Correct choice (1-4)"
                  required
                  min="1"
                  max="4"
                />
              </>
            )}
          </div>
          <DialogFooter>
            {currentQuestion <= numQuestions ? (
              <Button onClick={handleNextQuestion} className="bg-primary-light">
                Next Question
              </Button>
            ) : (
              <Button onClick={handleSubmitQuiz} className="bg-primary-light">
                Submit Quiz
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {message && (
        <p
          className={`mt-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
