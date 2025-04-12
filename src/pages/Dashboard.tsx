
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart4, Users, FileText, ClipboardCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const StatCard = ({ icon: Icon, title, value, description, color, bgColor }: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  description: string,
  color: string,
  bgColor: string
}) => {
  return (
    <Card className={`${bgColor} border-0 shadow-sm`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || 'Admin'}
            </p>
          </div>
          
          <button className="bg-exam-purple hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="hidden md:inline">Schedule New Exam</span>
            <span className="md:hidden">+ Exam</span>
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            icon={FileText}
            title="Total Exams" 
            value="142" 
            description="+6% from last month"
            color="text-exam-purple"
            bgColor="bg-exam-light"
          />
          <StatCard 
            icon={Users}
            title="Active Candidates" 
            value="2,350" 
            description="+12% from last month"
            color="text-exam-blue"
            bgColor="bg-exam-lightblue"
          />
          <StatCard 
            icon={UserCheck}
            title="Completion Rate" 
            value="93.6%" 
            description="+2.1% from last month"
            color="text-exam-green"
            bgColor="bg-green-50"
          />
          <StatCard 
            icon={ClipboardCheck}
            title="AI Proctoring Alerts" 
            value="24" 
            description="Requires review"
            color="text-amber-500"
            bgColor="bg-amber-50"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card className="col-span-full lg:col-span-3">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-4">
                <div className="bg-exam-light text-exam-purple px-3 py-1 rounded-full cursor-pointer font-medium">Overview</div>
                <div className="text-gray-500 px-3 py-1 rounded-full cursor-pointer">Upcoming Exams</div>
                <div className="text-gray-500 px-3 py-1 rounded-full cursor-pointer">Recent Exams</div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-xl font-bold">Exam Statistics</div>
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Exam statistics chart will be displayed here
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-exam-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson completed "Advanced Mathematics"</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <ClipboardCheck className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Proctoring flagged suspicious activity</p>
                    <p className="text-xs text-muted-foreground">25 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-exam-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New exam template created</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assessments</CardTitle>
              <CardDescription>Scheduled for next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Electronics Sector</p>
                      <p className="text-xs text-muted-foreground">Field Technician</p>
                    </div>
                    <p className="text-sm">124 candidates</p>
                  </div>
                  <Progress value={75} className="h-2 bg-purple-100" indicatorClassName="bg-exam-purple" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Healthcare Sector</p>
                      <p className="text-xs text-muted-foreground">General Duty Assistant</p>
                    </div>
                    <p className="text-sm">98 candidates</p>
                  </div>
                  <Progress value={65} className="h-2 bg-blue-100" indicatorClassName="bg-exam-blue" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">IT-ITES Sector</p>
                      <p className="text-xs text-muted-foreground">Domestic Data Entry Operator</p>
                    </div>
                    <p className="text-sm">76 candidates</p>
                  </div>
                  <Progress value={45} className="h-2 bg-green-100" indicatorClassName="bg-exam-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Sectors</CardTitle>
              <CardDescription>Based on pass percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">IT-ITES</p>
                    <p className="text-sm font-medium">92%</p>
                  </div>
                  <Progress value={92} className="h-2 bg-purple-100" indicatorClassName="bg-exam-purple" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Healthcare</p>
                    <p className="text-sm font-medium">87%</p>
                  </div>
                  <Progress value={87} className="h-2 bg-blue-100" indicatorClassName="bg-exam-blue" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Retail</p>
                    <p className="text-sm font-medium">83%</p>
                  </div>
                  <Progress value={83} className="h-2 bg-green-100" indicatorClassName="bg-exam-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
