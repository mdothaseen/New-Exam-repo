
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart4, Users, FileText, ClipboardCheck, UserCheck } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, description, color }: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  description: string,
  color: string
}) => {
  return (
    <Card>
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
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to Skill Pulse Exam Hub Admin Panel
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            icon={Users}
            title="Total Candidates" 
            value="12,345" 
            description="+573 from last month"
            color="text-skill-blue"
          />
          <StatCard 
            icon={UserCheck}
            title="Active Assessors" 
            value="145" 
            description="+22 from last month"
            color="text-skill-orange"
          />
          <StatCard 
            icon={ClipboardCheck}
            title="Assessments Completed" 
            value="8,761" 
            description="+1,156 from last month"
            color="text-green-500"
          />
          <StatCard 
            icon={FileText}
            title="Question Sets" 
            value="124" 
            description="+18 from last month"
            color="text-purple-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Assessment Activity</CardTitle>
              <CardDescription>
                Number of assessments completed in the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Assessment chart will be displayed here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assessments</CardTitle>
              <CardDescription>
                Scheduled for next 7 days
              </CardDescription>
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
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Healthcare Sector</p>
                      <p className="text-xs text-muted-foreground">General Duty Assistant</p>
                    </div>
                    <p className="text-sm">98 candidates</p>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">IT-ITES Sector</p>
                      <p className="text-xs text-muted-foreground">Domestic Data Entry Operator</p>
                    </div>
                    <p className="text-sm">76 candidates</p>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Construction Sector</p>
                      <p className="text-xs text-muted-foreground">Assistant Mason</p>
                    </div>
                    <p className="text-sm">65 candidates</p>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New assessors added</p>
                    <p className="text-xs text-muted-foreground">15 new assessors registered</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Question Set Updated</p>
                    <p className="text-xs text-muted-foreground">IT-ITES Sector - Set 2 revised</p>
                  </div>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Assessment Completed</p>
                    <p className="text-xs text-muted-foreground">Healthcare Batch #H-245 assessment finished</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New SSC Onboarded</p>
                    <p className="text-xs text-muted-foreground">Aerospace & Aviation Sector Skill Council added</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Sectors</CardTitle>
              <CardDescription>
                Based on pass percentage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">IT-ITES</p>
                    <p className="text-sm font-medium">92%</p>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Healthcare</p>
                    <p className="text-sm font-medium">87%</p>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Retail</p>
                    <p className="text-sm font-medium">83%</p>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Electronics</p>
                    <p className="text-sm font-medium">79%</p>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Construction</p>
                    <p className="text-sm font-medium">76%</p>
                  </div>
                  <Progress value={76} className="h-2" />
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
