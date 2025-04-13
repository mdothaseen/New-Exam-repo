import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const {
    logout
  } = useAuth();
  
  const handleLogout = () => {
    logout();
    // No navigation here - the logout function will handle redirection
  };
  
  return <header className="bg-white border-b border-gray-100 py-3 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 text-slate-700 hover:text-sky-600 transition-colors" />
        <div className="text-xl font-bold hidden md:inline-flex text-slate-800">Cee Vision Technology Pvt. Ltd.</div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-sky-600 hover:bg-sky-50">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-sky-50">
              <Avatar className="h-9 w-9 border-2 border-sky-100">
                <AvatarImage src="/placeholder.svg" alt="User avatar" />
                <AvatarFallback className="bg-sky-100 text-sky-700">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-slate-200 shadow-lg">
            <DropdownMenuLabel className="text-slate-800">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem onClick={() => navigate("/profile")} className="hover:bg-sky-50 cursor-pointer">
              <User className="mr-2 h-4 w-4 text-sky-600" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="hover:bg-sky-50 cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-sky-600" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
};

export default Header;
