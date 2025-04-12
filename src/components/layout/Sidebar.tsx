
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart4, 
  Users, 
  FileText, 
  ClipboardCheck, 
  MonitorPlay, 
  FileBarChart, 
  Settings
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

// Create Skill India logo component
const SkillIndiaLogo = () => (
  <div className="flex items-center justify-center py-3">
    <div className="text-white font-bold text-lg">Skill Pulse Exam Hub</div>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items
  const menuItems = [
    { icon: BarChart4, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'User Management', path: '/users', 
      subItems: [
        { label: 'Assessors', path: '/users/assessors' },
        { label: 'Candidates', path: '/users/candidates' },
        { label: 'Team/NCVET', path: '/users/team' },
        { label: 'SSC', path: '/users/ssc' },
      ]
    },
    { icon: FileText, label: 'Content Management', path: '/content' },
    { icon: ClipboardCheck, label: 'Assessment Management', path: '/assessments' },
    { icon: MonitorPlay, label: 'Monitoring', path: '/monitoring' },
    { icon: FileBarChart, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarComponent>
      <SidebarHeader>
        <SkillIndiaLogo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={`${isActive(item.path) ? 'bg-sidebar-accent text-white' : 'hover:bg-sidebar-accent/50'} transition-colors`}
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
