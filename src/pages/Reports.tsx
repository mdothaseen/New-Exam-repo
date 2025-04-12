import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart4, 
  Download, 
  FileBarChart, 
  FileText, 
  Filter, 
  Share2 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const sectorPerformance = [
  { sector: "IT-ITES", assessments: 2345, passRate: 86, avgScore: 72 },
  { sector: "Healthcare", assessments: 1876, passRate: 82, avgScore: 68 },
  { sector: "Electronics", assessments: 1542, passRate: 79, avgScore: 65 },
  { sector: "Retail", assessments: 1235, passRate: 81, avgScore: 67 },
  { sector: "Construction", assessments: 987, passRate: 75, avgScore: 62 },
];

const recentResults = [
  { 
    batchId: "B-2023-001", 
    title: "IT-ITES Batch Delhi-22",
    date: "2023-09-30",
    candidates: 45,
    passed: 38,
    passRate: 84,
    avgScore: 76
  },
  { 
    batchId: "B-2023-002", 
    title: "Healthcare Batch Mumbai-15",
    date: "2023-09-28",
    candidates: 38,
    passed: 31,
    passRate: 82,
    avgScore: 71
  },
  { 
    batchId: "B-2023-003", 
    title: "Electronics Batch Bangalore-08",
    date: "2023-09-25",
    candidates: 32,
    passed: 25,
    passRate: 78,
    avgScore: 69
  },
  { 
    batchId: "B-2023-004", 
    title: "Retail Batch Chennai-11",
    date: "2023-09-22",
    candidates: 40,
    passed: 32,
    passRate: 80,
    avgScore: 72
  },
];

const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <p className="text-muted-foreground">
              Assessment insights, analytics, and reports
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="results">Results Sheet</TabsTrigger>
            <TabsTrigger value="log">Log Sheet</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="practical">Practical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Assessments</CardTitle>
                  <CardDescription>All assessment sessions conducted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8,432</div>
                  <p className="text-xs text-muted-foreground mt-1">+14% from last quarter</p>
                  <div className="mt-4 h-32 flex items-center justify-center text-muted-foreground">
                    Assessment trend chart will be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Overall Pass Rate</CardTitle>
                  <CardDescription>Across all sectors and job roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">78.6%</div>
                  <p className="text-xs text-muted-foreground mt-1">+2.1% from last quarter</p>
                  <div className="mt-4 h-32 flex items-center justify-center text-muted-foreground">
                    Pass rate chart will be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Average Score</CardTitle>
                  <CardDescription>Mean score across all assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">68.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">+1.5% from last quarter</p>
                  <div className="mt-4 h-32 flex items-center justify-center text-muted-foreground">
                    Score distribution chart will be displayed here
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Sector Performance</CardTitle>
                      <CardDescription>Performance metrics by sector</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <BarChart4 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sector</TableHead>
                        <TableHead className="text-center">Assessments</TableHead>
                        <TableHead className="text-center">Pass Rate</TableHead>
                        <TableHead className="text-center">Avg Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sectorPerformance.map((sector) => (
                        <TableRow key={sector.sector}>
                          <TableCell className="font-medium">{sector.sector}</TableCell>
                          <TableCell className="text-center">{sector.assessments}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={sector.passRate >= 80 ? "default" : "secondary"}
                            >
                              {sector.passRate}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{sector.avgScore}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recent Results</CardTitle>
                      <CardDescription>Latest assessment batch results</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Batch</TableHead>
                        <TableHead className="text-center">Candidates</TableHead>
                        <TableHead className="text-center">Passed</TableHead>
                        <TableHead className="text-center">Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentResults.map((result) => (
                        <TableRow key={result.batchId}>
                          <TableCell>
                            <div className="font-medium">{result.title}</div>
                            <div className="text-xs text-muted-foreground">{result.date}</div>
                          </TableCell>
                          <TableCell className="text-center">{result.candidates}</TableCell>
                          <TableCell className="text-center">{result.passed}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={result.passRate >= 80 ? "default" : "secondary"}
                            >
                              {result.passRate}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Results Sheet</CardTitle>
                    <CardDescription>
                      Detailed assessment results for all candidates
                    </CardDescription>
                  </div>
                  <Button>
                    <FileBarChart className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Results sheet content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="log">
            <Card>
              <CardHeader>
                <CardTitle>Log Sheet</CardTitle>
                <CardDescription>
                  Assessment session logs and activity records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Log sheet content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="theory">
            <Card>
              <CardHeader>
                <CardTitle>Theory Assessment Reports</CardTitle>
                <CardDescription>
                  Analysis and reports for theory-based assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Theory assessment report content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practical">
            <Card>
              <CardHeader>
                <CardTitle>Practical Assessment Reports</CardTitle>
                <CardDescription>
                  Analysis and reports for practical assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Practical assessment report content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Reports;
