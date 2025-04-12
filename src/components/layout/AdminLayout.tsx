
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
            {children}
          </main>
          <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
            Skill Pulse Exam Hub &copy; {new Date().getFullYear()} Skill India Digital Initiative
          </footer>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
