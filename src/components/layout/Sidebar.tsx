import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart4, Users, FileText, ClipboardCheck, MonitorPlay, FileBarChart, Settings, BookOpen, CalendarCheck, FileSpreadsheet, CheckCircle, UserCheck } from 'lucide-react';
import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";

const SkillPulseLogo = () => <div className="flex items-center justify-center py-3">
    <div className="flex items-center space-x-2">
      <div className="bg-white rounded-full p-1">
        <CheckCircle className="h-6 w-6 text-[#6b21a8]" />
      </div>
      <div className="text-white font-bold text-lg">Cee Vision</div>
    </div>
  </div>;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items - removed the Exams entry
  const menuItems = [{
    icon: BarChart4,
    label: 'Dashboard',
    path: '/dashboard'
  }, {
    icon: CalendarCheck,
    label: 'Schedule Exams',
    path: '/schedule'
  }, {
    icon: UserCheck,
    label: 'Assessors',
    path: '/assessors'
  }, {
    icon: Users,
    label: 'Manage Candidates',
    path: '/users/candidates'
  }, {
    icon: BookOpen,
    label: 'Question Bank',
    path: '/content'
  }, {
    icon: MonitorPlay,
    label: 'AI Proctoring',
    path: '/monitoring'
  }, {
    icon: CheckCircle,
    label: 'Results',
    path: '/results'
  }, {
    icon: FileBarChart,
    label: 'Reports',
    path: '/reports'
  }, {
    icon: FileSpreadsheet,
    label: 'Exam Templates',
    path: '/templates'
  }, {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  }];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Improved color scheme with deeper purple and better contrast
  return <SidebarComponent className="bg-gradient-to-b from-[#4a148c] to-[#6a1b9a] border-r-0">
      <SidebarHeader className="border-b border-white/10">
        <SkillPulseLogo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 px-4 py-2 text-xs uppercase tracking-wider">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={() => navigate(item.path)} className={`${isActive(item.path) ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'} transition-colors rounded-md mb-1`}>
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-white/10">
        <div className="px-3 py-2 text-xs text-white/70 text-center">
          Skill India Digital Initiative<br />
          &copy; {new Date().getFullYear()}
        </div>
      </SidebarFooter>
    </SidebarComponent>;
};

export default Sidebar;
