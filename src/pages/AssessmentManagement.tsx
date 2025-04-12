
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Search, Calendar, MoreHorizontal, Eye, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for scheduled assessments
const scheduledAssessments = [
  { 
    id: 'A-2023-001', 
    title: 'IT-ITES Batch Delhi-22', 
    sector: 'IT-ITES', 
    candidateCount: 45, 
    date: '2023-10-18', 
    time: '10:00 AM', 
    center: 'Digital Skills Center, Delhi', 
    status: 'Scheduled' 
  },
  { 
    id: 'A-2023-002', 
    title: 'Healthcare Batch Mumbai-15', 
    sector: 'Healthcare', 
    candidateCount: 38, 
    date: '2023-10-20', 
    time: '11:30 AM', 
    center: 'Healthcare Training Academy, Mumbai', 
    status: 'Scheduled' 
  },
  { 
    id: 'A-2023-003', 
    title: 'Electronics Batch Bangalore-08', 
    sector: 'Electronics', 
    candidateCount: 32, 
    date: '2023-10-25', 
    time: '9:00 AM', 
    center: 'Electronics Skill Center, Bangalore', 
    status: 'Confirmed' 
  },
];

// Mock data for ongoing assessments
const ongoingAssessments = [
  { 
    id: 'A-2023-004', 
    title: 'Retail Batch Chennai-11', 
    sector: 'Retail', 
    candidateCount: 40, 
    progress: 65, 
    startTime: '09:30 AM', 
    endTime: '11:30 AM', 
    center: 'Retail Skill Academy, Chennai', 
    status: 'In Progress' 
  },
  { 
    id: 'A-2023-005', 
    title: 'Construction Batch Hyderabad-05', 
    sector: 'Construction', 
    candidateCount: 35, 
    progress: 30, 
    startTime: '10:00 AM', 
    endTime: '12:00 PM', 
    center: 'Construction Skills Institute, Hyderabad', 
    status: 'In Progress' 
  },
];

// Mock data for completed assessments
const completedAssessments = [
  { 
    id: 'A-2023-006', 
    title: 'Tourism Batch Jaipur-03', 
    sector: 'Tourism', 
    candidateCount: 28, 
    date: '2023-10-05', 
    passPercentage: 78, 
    center: 'Tourism Academy, Jaipur', 
    status: 'Completed' 
  },
  { 
    id: 'A-2023-007', 
    title: 'Agriculture Batch Punjab-12', 
    sector: 'Agriculture', 
    candidateCount: 42, 
    date: '2023-09-30', 
    passPercentage: 82, 
    center: 'Agriculture Training Institute, Punjab', 
    status: 'Completed' 
  },
  { 
    id: 'A-2023-008', 
    title: 'Banking Batch Kolkata-07', 
    sector: 'BFSI', 
    candidateCount: 35, 
    date: '2023-09-28', 
    passPercentage: 75, 
    center: 'Banking Training Center, Kolkata', 
    status: 'Completed' 
  },
];

const AssessmentManagement = () => {
  const [activeTab, setActiveTab] = useState('scheduled');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Assessment Management</h2>
            <p className="text-muted-foreground">
              Schedule, monitor, and manage candidate assessment sessions
            </p>
          </div>
          <Button className="bg-skill-blue hover:bg-skill-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Schedule New Assessment
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Scheduled Assessments</CardTitle>
                    <CardDescription>
                      Upcoming assessment sessions that are planned and confirmed
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <Input type="search" placeholder="Search assessments..." className="w-64" />
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendar View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-center">Candidates</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Center</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledAssessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>{assessment.id}</TableCell>
                        <TableCell className="font-medium">{assessment.title}</TableCell>
                        <TableCell>{assessment.sector}</TableCell>
                        <TableCell className="text-center">{assessment.candidateCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{assessment.date}</span>
                            <span className="text-xs text-muted-foreground">{assessment.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>{assessment.center}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={assessment.status === 'Confirmed' ? 'default' : 'outline'}
                          >
                            {assessment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Candidate List</DropdownMenuItem>
                              <DropdownMenuItem>Send Notifications</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Cancel Assessment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ongoing">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Ongoing Assessments</CardTitle>
                    <CardDescription>
                      Assessment sessions currently in progress
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Live Monitoring
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-center">Candidates</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Center</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingAssessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>{assessment.id}</TableCell>
                        <TableCell className="font-medium">{assessment.title}</TableCell>
                        <TableCell>{assessment.sector}</TableCell>
                        <TableCell className="text-center">{assessment.candidateCount}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={assessment.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground text-right">{assessment.progress}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs">Start: {assessment.startTime}</span>
                            <span className="text-xs">End: {assessment.endTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>{assessment.center}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Monitor
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Completed Assessments</CardTitle>
                    <CardDescription>
                      Assessment sessions that have been completed
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Input type="search" placeholder="Search completed..." className="w-64" />
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-center">Candidates</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Pass %</TableHead>
                      <TableHead>Center</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedAssessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>{assessment.id}</TableCell>
                        <TableCell className="font-medium">{assessment.title}</TableCell>
                        <TableCell>{assessment.sector}</TableCell>
                        <TableCell className="text-center">{assessment.candidateCount}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={assessment.passPercentage >= 80 ? 'default' : 
                                   assessment.passPercentage >= 70 ? 'secondary' : 'outline'}
                          >
                            {assessment.passPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell>{assessment.center}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Results</DropdownMenuItem>
                              <DropdownMenuItem>Download Report</DropdownMenuItem>
                              <DropdownMenuItem>View Candidate Data</DropdownMenuItem>
                              <DropdownMenuItem>Generate Certificates</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="batches">
            <Card>
              <CardHeader>
                <CardTitle>Batch Management</CardTitle>
                <CardDescription>
                  Manage assessment batches and training partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Batch management content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schemes">
            <Card>
              <CardHeader>
                <CardTitle>Scheme Management</CardTitle>
                <CardDescription>
                  Manage different schemes and their assessment parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Scheme management content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AssessmentManagement;
