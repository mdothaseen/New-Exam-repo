
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportHeader } from './components/ReportHeader';
import { DashboardContent } from './components/DashboardContent';
import { ReportTab } from './components/ReportTab';

const ReportsPage = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  
  const [activeTab, setActiveTab] = useState(() => {
    const path = tab || 'dashboard';
    return path === 'reports' ? 'dashboard' : path;
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/reports/${value}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ReportHeader 
          title="Reports" 
          description="Assessment insights, analytics, and reports" 
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="results">Results Sheet</TabsTrigger>
            <TabsTrigger value="log">Log Sheet</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="practical">Practical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <DashboardContent />
          </TabsContent>
          
          <TabsContent value="results">
            <ReportTab 
              title="Results Sheet"
              description="Detailed assessment results for all candidates"
              showGenerateButton={true}
            />
          </TabsContent>
          
          <TabsContent value="log">
            <ReportTab 
              title="Log Sheet"
              description="Assessment session logs and activity records"
            />
          </TabsContent>
          
          <TabsContent value="theory">
            <ReportTab 
              title="Theory Assessment Reports"
              description="Analysis and reports for theory-based assessments"
            />
          </TabsContent>
          
          <TabsContent value="practical">
            <ReportTab 
              title="Practical Assessment Reports"
              description="Analysis and reports for practical assessments"
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
