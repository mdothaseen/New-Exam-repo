import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import ExamForm from './scheduleExam/components/ExamForm';
import { Calendar, Users, MapPin, PlusCircle, CheckCircle2, Clock, AlertCircle, Users2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample data for scheduled batches
const SCHEDULED_BATCHES = [
  {
    id: 'B001',
    schemeName: 'PMKVY 4.0',
    batchId: 'PMKVY-B2023-001',
    jobRole: 'Software Developer',
    tcName: 'Tech Solutions Training Center',
    state: 'Karnataka',
    district: 'Bangalore',
    examDate: new Date('2023-12-15T10:00:00'),
    candidates: 25,
    assessorName: 'Rahul Sharma',
    status: 'upcoming'
  },
  {
    id: 'B002',
    schemeName: 'NIELIT',
    batchId: 'NIELIT-B2023-015',
    jobRole: 'Network Administrator',
    tcName: 'Digital Skills Institute',
    state: 'Tamil Nadu',
    district: 'Chennai',
    examDate: new Date('2023-12-10T14:00:00'),
    candidates: 18,
    assessorName: 'Priya Patel',
    status: 'upcoming'
  },
  {
    id: 'B003',
    schemeName: 'DDUGKY',
    batchId: 'DDUGKY-B2023-042',
    jobRole: 'Customer Service Executive',
    tcName: 'Rural Development Center',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    examDate: new Date('2023-11-28T09:30:00'),
    candidates: 32,
    assessorName: 'Amit Singh',
    status: 'completed'
  },
  {
    id: 'B004',
    schemeName: 'PMKVY 4.0',
    batchId: 'PMKVY-B2023-089',
    jobRole: 'Data Entry Operator',
    tcName: 'Digital Literacy Hub',
    state: 'Maharashtra',
    district: 'Pune',
    examDate: new Date('2023-12-05T11:00:00'),
    candidates: 20,
    assessorName: 'Sneha Gupta',
    status: 'upcoming'
  },
  {
    id: 'B005',
    schemeName: 'SANKALP',
    batchId: 'SANKALP-B2023-027',
    jobRole: 'Web Designer',
    tcName: 'Creative Tech Academy',
    state: 'Gujarat',
    district: 'Ahmedabad',
    examDate: new Date('2023-11-25T13:00:00'),
    candidates: 15,
    assessorName: 'Vikram Desai',
    status: 'cancelled'
  }
];

const ScheduleExam = () => {
  const [showForm, setShowForm] = useState(false);
  const [scheduledBatches, setScheduledBatches] = useState(SCHEDULED_BATCHES);
  const [activeTab, setActiveTab] = useState("all");
  
  // Handle form submission from child component
  const handleExamScheduled = (examData: any) => {
    const newBatch = {
      id: `B00${scheduledBatches.length + 1}`,
      ...examData,
      status: 'upcoming'
    };
    
    setScheduledBatches([newBatch, ...scheduledBatches]);
    setShowForm(false);
  };
  
  // Filter batches based on active tab
  const filteredBatches = scheduledBatches.filter(batch => {
    if (activeTab === "all") return true;
    return batch.status === activeTab;
  });
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="mr-1 h-3 w-3" /> Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="mr-1 h-3 w-3" /> Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600"><AlertCircle className="mr-1 h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Schedule Exam</h2>
            <p className="text-muted-foreground">
              Manage and create exam schedules for assessment centers
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-purple-50 border border-purple-100 rounded-lg px-4 py-2">
              <Calendar className="h-4 w-4 text-purple-600 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-green-50 border border-green-100 rounded-lg px-4 py-2">
              <Users className="h-4 w-4 text-green-600 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Assessors</p>
                <p className="text-sm font-medium">12 Available</p>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
              <MapPin className="h-4 w-4 text-blue-600 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Centers</p>
                <p className="text-sm font-medium">48 Active</p>
              </div>
            </div>
          </div>
        </div>
        
        {showForm ? (
          <ExamForm onExamScheduled={handleExamScheduled} onCancel={() => setShowForm(false)} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Scheduled Exam Batches</h3>
              <Button 
                onClick={() => setShowForm(true)} 
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule New Exam
              </Button>
            </div>
            
            <Card className="border rounded-lg overflow-hidden">
              <CardHeader className="bg-gray-50 px-6 py-4 border-b">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full max-w-md grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="max-h-[600px]">
                  {filteredBatches.length > 0 ? (
                    <div className="divide-y border-b">
                      {filteredBatches.map((batch) => (
                        <div key={batch.id} className="p-5 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h4 className="font-medium text-lg">{batch.schemeName}</h4>
                                {getStatusBadge(batch.status)}
                              </div>
                              <p className="text-muted-foreground text-sm">{batch.batchId} • {batch.jobRole}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-purple-600" />
                                  <span>{formatDate(batch.examDate)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-purple-600" />
                                  <span>{formatTime(batch.examDate)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users2 className="h-4 w-4 text-purple-600" />
                                  <span>{batch.candidates} Candidates</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-purple-200 text-purple-800">
                                    {batch.assessorName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{batch.assessorName}</p>
                                  <p className="text-xs text-gray-500">Assessor</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                  View Details
                                </Button>
                                {batch.status === 'upcoming' && (
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      <div className="flex justify-center mb-4">
                        <Calendar className="h-12 w-12 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No batches found</h3>
                      <p>There are no exam batches matching the selected filter.</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredBatches.length} of {scheduledBatches.length} batches
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ScheduleExam;
