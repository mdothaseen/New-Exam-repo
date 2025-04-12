
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/users/UserManagement";
import ContentManagement from "./pages/ContentManagement";
import AssessmentManagement from "./pages/AssessmentManagement";
import Monitoring from "./pages/Monitoring";
import ReportsPage from "./pages/reports/ReportsPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ExamTest from "./pages/exam/ExamTest";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import ScheduleExam from "./pages/ScheduleExam"; 
import Assessors from "./pages/assessors/Assessors"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/exam/:examId" element={<ExamTest />} />
        
        {/* Protected Admin Routes */}
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/users/:tab" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/content" element={<ProtectedRoute><ContentManagement /></ProtectedRoute>} />
        <Route path="/assessments" element={<ProtectedRoute><AssessmentManagement /></ProtectedRoute>} />
        <Route path="/monitoring" element={<ProtectedRoute><Monitoring /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/reports/:tab" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        
        {/* Make sure these routes are properly included */}
        <Route path="/schedule" element={<ProtectedRoute><ScheduleExam /></ProtectedRoute>} />
        <Route path="/assessors" element={<ProtectedRoute><Assessors /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
