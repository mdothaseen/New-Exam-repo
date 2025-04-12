
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
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
import { Search, Eye, AlertTriangle, Camera, MonitorPlay, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock data for ongoing batch monitoring
const ongoingBatches = [
  { 
    id: 'B-2023-001', 
    title: 'IT-ITES Batch Delhi-22', 
    center: 'Digital Skills Center, Delhi',
    candidates: 45,
    activeCount: 42,
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    progress: 65,
    alerts: 3
  },
  { 
    id: 'B-2023-002', 
    title: 'Healthcare Batch Mumbai-15', 
    center: 'Healthcare Training Academy, Mumbai',
    candidates: 38,
    activeCount: 35,
    startTime: '11:30 AM',
    endTime: '01:30 PM',
    progress: 40,
    alerts: 1
  },
  { 
    id: 'B-2023-003', 
    title: 'Construction Batch Hyderabad-05', 
    center: 'Construction Skills Institute, Hyderabad',
    candidates: 35,
    activeCount: 33,
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    progress: 25,
    alerts: 5
  },
];

const monitoringCards = [
  {
    title: "Active Assessments",
    value: "3",
    description: "Currently in progress",
    color: "text-green-500"
  },
  {
    title: "Total Candidates",
    value: "118",
    description: "Taking assessments now",
    color: "text-blue-500"
  },
  {
    title: "Active Proctors",
    value: "12",
    description: "Monitoring candidates",
    color: "text-orange-500"
  },
  {
    title: "Alert Flagged",
    value: "9",
    description: "Requiring attention",
    color: "text-red-500"
  }
];

const ProctorMonitoringCard = ({ batch }: { batch: any }) => {
  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{batch.title}</h3>
            <p className="text-sm text-muted-foreground">{batch.center}</p>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <Eye className="h-4 w-4 mr-1" />
            View Live
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between text-sm">
          <div>
            <div className="font-medium">Candidates</div>
            <div className="text-muted-foreground">{batch.activeCount}/{batch.candidates} active</div>
          </div>
          <div>
            <div className="font-medium">Time</div>
            <div className="text-muted-foreground">{batch.startTime} - {batch.endTime}</div>
          </div>
          <div>
            <div className="font-medium">Alerts</div>
            <div className="text-red-500 font-medium">{batch.alerts} flags</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span>{batch.progress}%</span>
          </div>
          <Progress value={batch.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Camera className="h-3 w-3 mr-1" />
            Verify ID
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <MonitorPlay className="h-3 w-3 mr-1" />
            Screens
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

const Monitoring = () => {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Monitoring & Proctoring</h2>
            <p className="text-muted-foreground">
              Live monitoring and proctoring of ongoing assessments
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {monitoringCards.map((card, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="live">Live Monitoring</TabsTrigger>
            <TabsTrigger value="batches">Batch Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alert Management</TabsTrigger>
            <TabsTrigger value="recordings">Recording Archive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Proctoring Dashboard</CardTitle>
                <CardDescription>
                  Monitor ongoing assessments and candidate activities in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingBatches.map((batch) => (
                  <ProctorMonitoringCard key={batch.id} batch={batch} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="batches">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Batch Overview</CardTitle>
                    <CardDescription>
                      Status of all ongoing assessment batches
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Input type="search" placeholder="Search batches..." className="w-64" />
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
                      <TableHead className="w-[100px]">Batch ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Assessment Center</TableHead>
                      <TableHead className="text-center">Candidates</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-center">Alerts</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell>{batch.id}</TableCell>
                        <TableCell className="font-medium">{batch.title}</TableCell>
                        <TableCell>{batch.center}</TableCell>
                        <TableCell className="text-center">{batch.activeCount}/{batch.candidates}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="default">In Progress</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-1">
                            <div>Start: {batch.startTime}</div>
                            <div>End: {batch.endTime}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={batch.alerts > 0 ? "destructive" : "outline"}>
                            {batch.alerts}
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
                              <DropdownMenuItem>View Live Stream</DropdownMenuItem>
                              <DropdownMenuItem>Monitor Screens</DropdownMenuItem>
                              <DropdownMenuItem>View Alerts</DropdownMenuItem>
                              <DropdownMenuItem>Verify Identity</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Flag for Review
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
          
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Alert Management</CardTitle>
                <CardDescription>
                  Review and manage alerts from proctoring system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Alert management content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recordings">
            <Card>
              <CardHeader>
                <CardTitle>Recording Archive</CardTitle>
                <CardDescription>
                  Access archived recordings of previous assessment sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Recording archive content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Monitoring;
