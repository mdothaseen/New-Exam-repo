
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart4, 
  Users, 
  FileText, 
  ClipboardCheck, 
  MonitorPlay, 
  FileBarChart, 
  Settings,
  School,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  CheckCircle
} from 'lucide-react';

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const SkillPulseLogo = () => (
  <div className="flex items-center justify-center py-3">
    <div className="flex items-center space-x-2">
      <div className="bg-white rounded-full p-1">
        <CheckCircle className="h-6 w-6 text-exam-purple" />
      </div>
      <div className="text-white font-bold text-lg">ExamPro</div>
    </div>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items
  const menuItems = [
    { icon: BarChart4, label: 'Dashboard', path: '/dashboard' },
    { icon: School, label: 'Exams', path: '/exams' },
    { icon: CalendarCheck, label: 'Schedule Exams', path: '/schedule' },
    { icon: Users, label: 'Manage Candidates', path: '/users/candidates' },
    { icon: BookOpen, label: 'Question Bank', path: '/content' },
    { icon: MonitorPlay, label: 'AI Proctoring', path: '/monitoring' },
    { icon: CheckCircle, label: 'Results', path: '/results' },
    { icon: FileBarChart, label: 'Reports', path: '/reports' },
    { icon: FileSpreadsheet, label: 'Exam Templates', path: '/templates' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarComponent className="bg-[#6b21a8] border-r-0">
      <SidebarHeader>
        <SkillPulseLogo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/50 px-4 py-2">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={`${isActive(item.path) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'} transition-colors`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2 text-xs text-white/70 text-center">
          Skill India Digital Initiative<br />
          &copy; {new Date().getFullYear()}
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
