
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import AssessorsTab from './tabs/AssessorsTab';
import CandidatesTab from './tabs/CandidatesTab';
import TeamTab from './tabs/TeamTab';
import SSCTab from './tabs/SSCTab';

const UserManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split('/').pop() || 'assessors';
    return path === 'users' ? 'assessors' : path;
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/users/${value}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground">
              Manage all users of the Skill Pulse Exam Hub platform
            </p>
          </div>
          <Button className="bg-skill-blue hover:bg-skill-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="assessors">Assessors</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="team">Team/NCVET</TabsTrigger>
            <TabsTrigger value="ssc">SSC</TabsTrigger>
          </TabsList>
          <TabsContent value="assessors">
            <AssessorsTab />
          </TabsContent>
          <TabsContent value="candidates">
            <CandidatesTab />
          </TabsContent>
          <TabsContent value="team">
            <TeamTab />
          </TabsContent>
          <TabsContent value="ssc">
            <SSCTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
