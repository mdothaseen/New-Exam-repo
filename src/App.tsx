
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/users/UserManagement";
import ContentManagement from "./pages/ContentManagement";
import AssessmentManagement from "./pages/AssessmentManagement";
import Monitoring from "./pages/Monitoring";
import ReportsPage from "./pages/reports/ReportsPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/:tab" element={<UserManagement />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/assessments" element={<AssessmentManagement />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:tab" element={<ReportsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
