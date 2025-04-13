import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  Download, 
  Eye, 
  Filter, 
  FileSpreadsheet, 
  Search, 
  ArrowUpDown,
  Calendar,
  BookOpen
} from 'lucide-react';

// Sample data for demonstration
const resultsData = [
  {
    id: "R-24001",
    examName: "JavaScript Fundamentals",
    date: "2024-04-10",
    candidate: "John Smith",
    score: 86,
    status: "Pass",
    sector: "IT-ITES",
    jobRole: "Web Developer"
  },
  {
    id: "R-24002",
    examName: "Database Management",
    date: "2024-04-09",
    candidate: "Sarah Johnson",
    score: 92,
    status: "Pass",
    sector: "IT-ITES",
    jobRole: "Database Administrator"
  },
  {
    id: "R-24003",
    examName: "Network Security",
    date: "2024-04-08",
    candidate: "Michael Chen",
    score: 76,
    status: "Pass",
    sector: "IT-ITES",
    jobRole: "Security Analyst"
  },
  {
    id: "R-24004",
    examName: "Clinical Assessments",
    date: "2024-04-08",
    candidate: "Emily Rodriguez",
    score: 68,
    status: "Fail",
    sector: "Healthcare",
    jobRole: "Nursing Assistant"
  },
  {
    id: "R-24005",
    examName: "Electronic Circuit Design",
    date: "2024-04-07",
    candidate: "David Kim",
    score: 88,
    status: "Pass",
    sector: "Electronics",
    jobRole: "Circuit Designer"
  },
  {
    id: "R-24006",
    examName: "Customer Service Skills",
    date: "2024-04-06",
    candidate: "Lisa Patel",
    score: 79,
    status: "Pass",
    sector: "Retail",
    jobRole: "Customer Service Representative"
  },
  {
    id: "R-24007",
    examName: "Construction Safety",
    date: "2024-04-05",
    candidate: "Robert Wilson",
    score: 62,
    status: "Fail",
    sector: "Construction",
    jobRole: "Site Safety Officer"
  }
];

// Summary data
const summaryData = {
  totalExams: 146,
  totalCandidates: 1240,
  passRate: "83%",
  averageScore: "76.4%"
};

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("all");

  // Filter results based on active tab, search term, and sector filter
  const filteredResults = resultsData.filter(result => {
    // Tab filter
    if (activeTab === "passed" && result.status !== "Pass") return false;
    if (activeTab === "failed" && result.status !== "Fail") return false;
    
    // Search term filter
    if (searchTerm && 
        !result.candidate.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !result.examName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !result.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Sector filter
    if (filterSector !== "all" && result.sector !== filterSector) return false;
    
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Assessment Results</h2>
            <p className="text-muted-foreground">
              View and manage candidate assessment results
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Exams</p>
                  <p className="text-2xl font-bold">{summaryData.totalExams}</p>
                </div>
                <div className="bg-sky-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-sky-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Candidates</p>
                  <p className="text-2xl font-bold">{summaryData.totalCandidates}</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold">{summaryData.passRate}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{summaryData.averageScore}</p>
                </div>
                <div className="bg-amber-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle>Assessment Results</CardTitle>
                <CardDescription>
                  View and manage candidate assessment results
                </CardDescription>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 w-full lg:w-auto">
                <div className="flex gap-2 w-full lg:w-auto">
                  <Input
                    type="search"
                    placeholder="Search by name, exam or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Select value={filterSector} onValueChange={setFilterSector}>
                    <SelectTrigger className="w-full md:w-44">
                      <SelectValue placeholder="Filter by sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="IT-ITES">IT-ITES</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full md:w-72 grid-cols-3">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="passed">Passed</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="pt-4">
              <TabsContent value="all" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>
                            <div>{result.examName}</div>
                            <div className="text-xs text-muted-foreground">{result.sector} · {result.jobRole}</div>
                          </TableCell>
                          <TableCell>{result.candidate}</TableCell>
                          <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-center">{result.score}%</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={result.status === "Pass" ? "default" : "destructive"}>
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="passed" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>
                            <div>{result.examName}</div>
                            <div className="text-xs text-muted-foreground">{result.sector} · {result.jobRole}</div>
                          </TableCell>
                          <TableCell>{result.candidate}</TableCell>
                          <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-center">{result.score}%</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="default">
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No passed results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="failed" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>
                            <div>{result.examName}</div>
                            <div className="text-xs text-muted-foreground">{result.sector} · {result.jobRole}</div>
                          </TableCell>
                          <TableCell>{result.candidate}</TableCell>
                          <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-center">{result.score}%</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="destructive">
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No failed results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Tabs>
          
          <CardFooter className="border-t px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                Showing {filteredResults.length} of {resultsData.length} results
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ResultsPage; 