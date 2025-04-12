
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

// Mock exam data
const mockExam = {
  id: 'demo-exam',
  title: 'Basic IT Skills Assessment',
  duration: 30, // minutes
  totalQuestions: 20,
  questions: Array(20).fill(null).map((_, index) => ({
    id: `q-${index + 1}`,
    text: `Question ${index + 1}: This is a sample question about IT skills and knowledge related to basic computer operations, software usage, or information technology concepts.`,
    options: [
      { id: `q-${index + 1}-a`, text: 'Option A: This is the first possible answer.' },
      { id: `q-${index + 1}-b`, text: 'Option B: This is the second possible answer.' },
      { id: `q-${index + 1}-c`, text: 'Option C: This is the third possible answer.' },
      { id: `q-${index + 1}-d`, text: 'Option D: This is the fourth possible answer.' },
    ],
    correctAnswer: `q-${index + 1}-a` // In a real app, this wouldn't be sent to the client
  }))
};

const ExamTest = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingTime, setRemainingTime] = useState(mockExam.duration * 60);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  
  // If user is not a candidate, redirect them
  useEffect(() => {
    if (user && user.role !== 'candidate') {
      navigate('/dashboard');
      toast({
        title: "Access Denied",
        description: "Only candidates can access the exam page.",
        variant: "destructive",
      });
    }
  }, [user, navigate]);

  // Handle timer
  useEffect(() => {
    if (examSubmitted) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examSubmitted]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Prevent leaving the exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!examSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [examSubmitted]);

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitExam = () => {
    // In a real app, you would send the answers to the server
    setExamSubmitted(true);
    toast({
      title: "Exam Submitted",
      description: "Your answers have been recorded successfully.",
      variant: "default",
    });
  };

  const attemptToLeave = () => {
    if (!examSubmitted) {
      setIsLeaveDialogOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const currentQuestion = mockExam.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / mockExam.totalQuestions * 100;

  if (examSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto h-16 w-16 text-[#50C878]" />
              <h1 className="text-2xl font-bold text-[#333333]">Exam Completed!</h1>
              <p className="text-muted-foreground">
                Thank you for completing the {mockExam.title}.
              </p>
              <p className="text-muted-foreground">
                Your answers have been recorded and will be evaluated.
              </p>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="mt-4 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon"
            className="mr-2"
            onClick={attemptToLeave}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold text-[#333333]">{mockExam.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#4A90E2]" />
          <span className={`font-mono ${remainingTime < 300 ? 'text-[#FF6B6B] font-bold' : ''}`}>
            {formatTime(remainingTime)}
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1 text-sm">
          <span>Question {currentQuestionIndex + 1} of {mockExam.totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Question */}
      <div className="flex-1 p-4 overflow-auto">
        <Card className="w-full max-w-3xl mx-auto bg-white">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-[#333333]">{currentQuestion.text}</h2>
              
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-4"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-[#F5F6FA]">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer text-[#333333]">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            onClick={goToPrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="border-[#E5E7EB] text-[#333333]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          {currentQuestionIndex === mockExam.questions.length - 1 ? (
            <Button 
              onClick={() => setIsSubmitDialogOpen(true)}
              className="bg-[#50C878] hover:bg-[#50C878]/90 text-white"
            >
              Submit Exam
            </Button>
          ) : (
            <Button 
              onClick={goToNextQuestion}
              className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Leave Exam Dialog */}
      <AlertDialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription>
              If you leave now, your progress will be lost and you may not be able to retake this exam.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                setIsLeaveDialogOpen(false);
                navigate('/dashboard');
              }}
              className="bg-[#FF6B6B]"
            >
              Leave Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Submit Exam Dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your exam?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {Object.keys(answers).length} out of {mockExam.totalQuestions} questions.
              {Object.keys(answers).length < mockExam.totalQuestions && (
                <div className="mt-2 flex items-center text-[#FF6B6B]">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>You have {mockExam.totalQuestions - Object.keys(answers).length} unanswered questions.</span>
                </div>
              )}
              <div className="mt-2">
                Once submitted, you cannot change your answers.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                setIsSubmitDialogOpen(false);
                submitExam();
              }}
              className="bg-[#50C878]"
            >
              Submit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamTest;
