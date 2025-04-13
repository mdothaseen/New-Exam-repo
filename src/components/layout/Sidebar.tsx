import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart4, Users, FileText, ClipboardCheck, MonitorPlay, FileBarChart, Settings, BookOpen, CalendarCheck, FileSpreadsheet, CheckCircle, UserCheck } from 'lucide-react';
import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const CeeVisionLogo = () => {
  const { state } = useSidebar();
  
  return (
    <div className="flex items-center justify-center py-4 px-3">
      {state === "expanded" ? (
        <img 
          src="/assets/images/logo.jpeg" 
          alt="Cee Vision Technology Pvt. Ltd. Logo" 
          className="h-16 w-auto object-contain max-w-full"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-xl">
          CV
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();

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

  // Modern color scheme with sleek gradient using latest design trends
  return <SidebarComponent collapsible="icon" className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e293b] border-r-0">
      <SidebarHeader className="border-b border-slate-700/30 flex items-center justify-between pr-3">
        <CeeVisionLogo />
        {state === "expanded" && (
          <SidebarTrigger className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/40" />
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 px-4 py-2 text-xs uppercase tracking-wider">
            {state === "expanded" ? "Admin Panel" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)} 
                    className={`${isActive(item.path) ? 'bg-sky-500/20 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-700/40'} transition-all duration-200 rounded-md mb-1`}
                    tooltip={item.label}
                  >
                    <item.icon className={`h-5 w-5 ${state === "expanded" ? "mr-3" : ""} ${isActive(item.path) ? 'text-sky-400' : 'text-slate-400'}`} />
                    {state === "expanded" && <span className="font-medium">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-slate-700/30">
        {state === "expanded" ? (
          <div className="px-3 py-2 text-xs text-slate-400 text-center">
            Cee Vision Technology Pvt. Ltd.<br />
            &copy; {new Date().getFullYear()}
          </div>
        ) : (
          <SidebarTrigger className="mx-auto my-2 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/40" />
        )}
      </SidebarFooter>
    </SidebarComponent>;
};

export default Sidebar;
