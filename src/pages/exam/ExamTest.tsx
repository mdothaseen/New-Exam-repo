import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { 
  ArrowLeft, ArrowRight, Clock, Camera, Info, AlertTriangle, 
  Flag, Award, PartyPopper, CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock exam data
const mockExam = {
  id: 'demo-exam',
  title: 'Basic IT Skills Assessment',
  duration: 60, // minutes
  totalQuestions: 20,
  instructions: [
    "Read each question carefully before answering.",
    "You will be monitored through your webcam during the exam.",
    "Switching tabs or windows may be flagged as suspicious activity.",
    "Ensure you have a stable internet connection throughout the exam.",
    "You have 60 minutes to complete all questions.",
    "You can review and change your answers before final submission.",
    "Once time expires, your exam will be automatically submitted."
  ],
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

// Enum for exam stages
enum ExamStage {
  Guidelines,
  CandidatePhoto,
  IdPhoto,
  Exam,
  Completed
}

const ExamTest = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const webcamRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingTime, setRemainingTime] = useState(mockExam.duration * 60);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [examStage, setExamStage] = useState(ExamStage.Guidelines);
  const [candidatePhoto, setCandidatePhoto] = useState<string | null>(null);
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [faceVisible, setFaceVisible] = useState(true);
  const [consecutiveNoFaceFrames, setConsecutiveNoFaceFrames] = useState(0);
  const [alertShown, setAlertShown] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  
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

  // Handle camera access with simulated face detection
  useEffect(() => {
    if (examStage === ExamStage.CandidatePhoto || examStage === ExamStage.IdPhoto || examStage === ExamStage.Exam) {
      const enableCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
            setCameraActive(true);
            
            // Start simulated face detection if in exam stage
            if (examStage === ExamStage.Exam) {
              startFaceDetection();
            }
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          toast({
            title: "Camera Access Failed",
            description: "Please allow camera access to continue the exam.",
            variant: "destructive",
          });
        }
      };
      
      enableCamera();
      
      return () => {
        if (cameraActive && webcamRef.current?.srcObject) {
          const tracks = (webcamRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [examStage, toast]);

  // Simulated face detection function
  const startFaceDetection = () => {
    if (!webcamRef.current) return;
    
    // Randomly simulate face detection/loss for demo purposes
    const interval = setInterval(() => {
      // 90% chance of face being detected, 10% chance of face not being detected
      const faceDetected = Math.random() > 0.1;
      setFaceVisible(faceDetected);
      
      if (!faceDetected) {
        setConsecutiveNoFaceFrames(prev => prev + 1);
        
        // If face not detected for 3 consecutive checks
        if (consecutiveNoFaceFrames >= 2 && !alertShown) {
          setAlertShown(true);
          toast({
            title: "Warning: Face Not Detected",
            description: "Please ensure your face is clearly visible in the camera.",
            variant: "destructive",
            duration: 5000,
          });
          
          // Reset alert shown flag after 10 seconds
          setTimeout(() => {
            setAlertShown(false);
          }, 10000);
        }
      } else {
        setConsecutiveNoFaceFrames(0);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  };

  // Handle timer when exam starts
  useEffect(() => {
    if (examStage === ExamStage.Exam && !examSubmitted) {
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
    }
  }, [examStage, examSubmitted]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Prevent leaving the exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (examStage === ExamStage.Exam && !examSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [examStage, examSubmitted]);

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

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < mockExam.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const takeCandidatePhoto = () => {
    if (webcamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(webcamRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setCandidatePhoto(dataUrl);
        setExamStage(ExamStage.IdPhoto);
      }
    }
  };

  const takeIdPhoto = () => {
    if (webcamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(webcamRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setIdPhoto(dataUrl);
      }
    }
  };

  const startExam = () => {
    setExamStage(ExamStage.Exam);
  };

  const submitExam = () => {
    // In a real app, you would send the answers to the server
    setExamSubmitted(true);
    setExamStage(ExamStage.Completed);
    setConfettiActive(true);
    
    toast({
      title: "Exam Submitted",
      description: "Your answers have been recorded successfully.",
      variant: "default",
    });
    
    // Turn off confetti after 8 seconds instead of 5
    setTimeout(() => {
      setConfettiActive(false);
    }, 8000);
  };

  const attemptToLeave = () => {
    if (examStage === ExamStage.Exam && !examSubmitted) {
      setIsLeaveDialogOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const currentQuestion = mockExam.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / mockExam.totalQuestions * 100;
  
  const renderFaceDetectionAlert = () => {
    if (examStage === ExamStage.Exam && !faceVisible) {
      return (
        <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 p-4 flex items-start gap-3 max-w-xs z-50 animate-pulse">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Face Not Detected</h3>
            <p className="text-sm text-red-700">Please ensure you are visible in the camera.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Guidelines screen
  if (examStage === ExamStage.Guidelines) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white">
          <CardHeader className="border-b">
            <CardTitle className="text-xl text-exam-purple">{mockExam.title} - Guidelines</CardTitle>
            <CardDescription>Please read all instructions carefully before proceeding</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-exam-light p-3 rounded-full mt-1">
                  <Info className="h-5 w-5 text-exam-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Exam Instructions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {mockExam.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-amber-50 p-3 rounded-full mt-1">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Important Notice</h3>
                  <p>You will need to allow camera access for identity verification and proctoring purposes. Your exam session will be monitored for any suspicious activities.</p>
                </div>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <Button
                  onClick={() => setExamStage(ExamStage.CandidatePhoto)}
                  className="w-full bg-exam-purple hover:bg-purple-800"
                >
                  I understand and want to proceed <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Candidate photo screen
  if (examStage === ExamStage.CandidatePhoto) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white">
          <CardHeader className="border-b">
            <CardTitle className="text-xl text-exam-purple">Candidate Photo Verification</CardTitle>
            <CardDescription>Please position your face clearly in the frame</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  {!candidatePhoto ? (
                    <video
                      ref={webcamRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={candidatePhoto}
                      alt="Candidate"
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {!candidatePhoto && (
                    <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 pointer-events-none"></div>
                  )}
                </div>
                
                {!candidatePhoto ? (
                  <Button
                    onClick={takeCandidatePhoto}
                    className="bg-exam-purple hover:bg-purple-800 flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" /> Take Photo
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCandidatePhoto(null)}
                    >
                      Retake
                    </Button>
                    <Button
                      onClick={() => setExamStage(ExamStage.IdPhoto)}
                      className="bg-exam-purple hover:bg-purple-800"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <Info className="h-5 w-5 text-exam-blue shrink-0 mt-0.5" />
                <p className="text-sm">Please ensure your face is clearly visible and well-lit. This photo will be used for verification purposes throughout the exam.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // ID photo screen
  if (examStage === ExamStage.IdPhoto) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white">
          <CardHeader className="border-b">
            <CardTitle className="text-xl text-exam-purple">ID Verification</CardTitle>
            <CardDescription>Please show your ID card to the camera</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  {!idPhoto ? (
                    <video
                      ref={webcamRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={idPhoto}
                      alt="ID"
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {!idPhoto && (
                    <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 pointer-events-none"></div>
                  )}
                </div>
                
                {!idPhoto ? (
                  <Button
                    onClick={takeIdPhoto}
                    className="bg-exam-purple hover:bg-purple-800 flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" /> Take Photo
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIdPhoto(null)}
                    >
                      Retake
                    </Button>
                    <Button
                      onClick={startExam}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Start Exam <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <Info className="h-5 w-5 text-exam-blue shrink-0 mt-0.5" />
                <p className="text-sm">Hold your valid ID card (Aadhar Card, PAN Card, Driving License, etc.) in front of the camera. Ensure all details are clearly visible.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Completed exam screen with celebration
  if (examStage === ExamStage.Completed) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {confettiActive && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Fixed animations with proper classes */}
            <div className="absolute top-0 left-1/4 animate-float">
              <PartyPopper className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="absolute top-0 right-1/4 animate-float animation-delay-300">
              <PartyPopper className="h-12 w-12 text-purple-500" />
            </div>
            <div className="absolute top-1/4 left-1/3 animate-float animation-delay-500">
              <PartyPopper className="h-12 w-12 text-sky-500" />
            </div>
            <div className="absolute top-1/4 right-1/3 animate-float animation-delay-700">
              <PartyPopper className="h-12 w-12 text-red-500" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-float animation-delay-200">
              <PartyPopper className="h-12 w-12 text-pink-500" />
            </div>
            <div className="absolute bottom-1/4 right-1/3 animate-float animation-delay-600">
              <PartyPopper className="h-12 w-12 text-indigo-500" />
            </div>
            <div className="absolute top-1/2 left-1/4 animate-float animation-delay-1000">
              <PartyPopper className="h-12 w-12 text-green-500" />
            </div>
            <div className="absolute top-1/2 right-1/4 animate-float animation-delay-1200">
              <PartyPopper className="h-12 w-12 text-orange-500" />
            </div>
            
            {/* Additional particle confetti */}
            {Array.from({ length: 60 }).map((_, i) => (
              <div 
                key={i}
                className="particle"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#FCD34D', '#60A5FA', '#34D399', '#F87171', '#A78BFA', '#FB7185', '#38BDF8', '#FBCFE8'][Math.floor(Math.random() * 8)],
                  width: `${Math.random() * 12 + 6}px`,
                  height: `${Math.random() * 12 + 6}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                  opacity: 1,
                  '--i': i
                } as React.CSSProperties}
              />
            ))}
            
            {/* Twinkling stars effect */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`star-${i}`}
                className="absolute"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  width: '3px',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px 3px rgba(255, 255, 255, 0.8)',
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        )}
        
        <Card className="w-full max-w-3xl bg-white animate-fade-in-up shadow-lg z-10">
          <CardHeader className="text-center border-b bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
            <div className="mx-auto bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-md">
              <Award className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-exam-purple mb-2">Congratulations!</CardTitle>
            <CardDescription className="text-lg">
              You have successfully completed the exam
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8 pb-6 text-center">
            <div className="space-y-8">
              <div className="max-w-md mx-auto">
                <h3 className="font-medium text-lg mb-4">Exam Summary</h3>
                <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-2 gap-6 shadow-inner">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Total Questions</p>
                    <p className="text-2xl font-bold text-exam-purple">{mockExam.totalQuestions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Attempted</p>
                    <p className="text-2xl font-bold text-exam-purple">{Object.keys(answers).length}</p>
                  </div>
                  <div className="text-center col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Time Spent</p>
                    <p className="text-2xl font-bold text-exam-purple">{formatTime(mockExam.duration * 60 - remainingTime)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-green-600 font-medium">Exam submitted successfully</p>
                </div>
                <p className="text-gray-600">You will be notified once your results are available.</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-6 pb-6 flex justify-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-b-lg">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-exam-purple hover:bg-purple-800 shadow-md transform transition-transform hover:scale-105 w-full md:w-auto px-8 py-6"
            >
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Main exam screen
  return (
    <div className="min-h-screen bg-[#F5F6FA] grid grid-cols-1 md:grid-cols-4">
      {/* Left panel - Questions */}
      <div className="col-span-1 md:col-span-3 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon"
              className="mr-2"
              onClick={attemptToLeave}
            >
              <ArrowLeft className="h-4 w-4" />
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
          <Card className="bg-white">
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
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={goToPrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="border-[#E5E7EB] text-[#333333]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            {currentQuestionIndex === mockExam.questions.length - 1 ? (
              <Button 
                onClick={() => setIsSubmitDialogOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Exam
              </Button>
            ) : (
              <Button 
                onClick={goToNextQuestion}
                className="bg-exam-purple hover:bg-purple-800 text-white"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Right panel - Webcam and question navigation */}
      <div className="hidden md:block md:col-span-1 bg-white border-l border-gray-200 h-screen overflow-y-auto">
        <div className="p-4 flex flex-col h-full">
          {/* Webcam preview */}
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-2">Proctoring Camera</h3>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={webcamRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Question navigation */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="font-medium text-sm mb-2">Question Navigation</h3>
            <div className="grid grid-cols-5 gap-2">
              {mockExam.questions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                const isActive = index === currentQuestionIndex;
                
                return (
                  <Button
                    key={q.id}
                    variant="outline"
                    size="sm"
                    className={`h-10 w-10 p-0 flex items-center justify-center ${
                      isActive ? 'border-exam-purple border-2' : 
                      isAnswered ? 'bg-green-100 text-green-800 border-green-200' : ''
                    }`}
                    onClick={() => goToQuestion(index)}
                  >
                    {isAnswered ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <span>{index + 1}</span>
                        <CheckCircle2 className="h-3 w-3 absolute bottom-0.5 right-0.5 text-green-600" />
                      </div>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* Exam summary */}
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium text-sm mb-2">Exam Progress</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Answered</span>
                <span className="font-medium">{Object.keys(answers).length} / {mockExam.totalQuestions}</span>
              </div>
              <Progress 
                value={(Object.keys(answers).length / mockExam.totalQuestions) * 100} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-green-600" 
              />
              
              <div className="flex items-center justify-between text-sm">
                <span>Time Remaining</span>
                <span className={`font-medium ${remainingTime < 300 ? 'text-red-600' : ''}`}>
                  {formatTime(remainingTime)}
                </span>
              </div>
              <Progress 
                value={(remainingTime / (mockExam.duration * 60)) * 100} 
                className="h-2 bg-gray-100" 
                indicatorClassName={`${remainingTime < 300 ? 'bg-red-500' : 'bg-blue-600'}`}
              />
            </div>
            
            {/* Submit button */}
            <Button
              onClick={() => setIsSubmitDialogOpen(true)}
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
            >
              Submit Exam
            </Button>
          </div>
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
                  <AlertTriangle className="h-4 w-4 mr-1" />
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
              className="bg-green-600"
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
