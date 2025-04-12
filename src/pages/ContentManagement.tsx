
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
import { 
  PlusCircle, 
  Search, 
  FileText, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Trash 
} from 'lucide-react';

// Mock data for demonstration
const questionPapers = [
  { id: 1, title: 'IT-ITES - Data Entry Operator - Set 1', sector: 'IT-ITES', jobRole: 'Domestic Data Entry Operator', questions: 50, version: '2.1', lastUpdated: '2023-08-15' },
  { id: 2, title: 'Healthcare - General Duty Assistant - Set 1', sector: 'Healthcare', jobRole: 'General Duty Assistant', questions: 45, version: '1.8', lastUpdated: '2023-07-22' },
  { id: 3, title: 'Electronics - Field Technician - Set 2', sector: 'Electronics', jobRole: 'Field Technician', questions: 60, version: '3.0', lastUpdated: '2023-09-05' },
  { id: 4, title: 'Retail - Sales Associate - Set 1', sector: 'Retail', jobRole: 'Retail Sales Associate', questions: 40, version: '2.5', lastUpdated: '2023-06-30' },
  { id: 5, title: 'Construction - Assistant Mason - Set 1', sector: 'Construction', jobRole: 'Assistant Mason', questions: 55, version: '1.2', lastUpdated: '2023-08-10' },
];

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('question-papers');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
            <p className="text-muted-foreground">
              Manage assessment content, question papers, and translations
            </p>
          </div>
          <Button className="bg-skill-blue hover:bg-skill-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Content
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="question-papers">Question Papers</TabsTrigger>
            <TabsTrigger value="translations">Translations</TabsTrigger>
            <TabsTrigger value="job-roles">Job Roles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="question-papers" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Question Papers</CardTitle>
                    <CardDescription>
                      Manage assessment question papers for various sectors and job roles
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center w-full max-w-sm space-x-2">
                      <Input type="search" placeholder="Search questions..." />
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Job Role</TableHead>
                      <TableHead className="text-center">Questions</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questionPapers.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell>{paper.id}</TableCell>
                        <TableCell className="font-medium">{paper.title}</TableCell>
                        <TableCell>{paper.sector}</TableCell>
                        <TableCell>{paper.jobRole}</TableCell>
                        <TableCell className="text-center">{paper.questions}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{paper.version}</Badge>
                        </TableCell>
                        <TableCell>{paper.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Create Translation</DropdownMenuItem>
                                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="translations">
            <Card>
              <CardHeader>
                <CardTitle>Translations Management</CardTitle>
                <CardDescription>
                  Manage translated question papers for different languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Translation management content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="job-roles">
            <Card>
              <CardHeader>
                <CardTitle>Job Roles Management</CardTitle>
                <CardDescription>
                  Manage the job roles associated with different sectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Job roles management content will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
