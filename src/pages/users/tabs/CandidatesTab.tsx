
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MoreHorizontal, Search, Download } from 'lucide-react';

// Mock data for demonstration
const candidates = [
  { 
    id: 'C-1001', 
    name: 'Ankit Patel', 
    email: 'ankit.patel@example.com',
    phone: '9876543210',
    sector: 'IT-ITES',
    jobRole: 'Domestic Data Entry Operator',
    trainingCenter: 'Digital Skills Institute, Delhi',
    status: 'Enrolled'
  },
  { 
    id: 'C-1002', 
    name: 'Meera Joshi', 
    email: 'meera.joshi@example.com',
    phone: '8765432109',
    sector: 'Healthcare',
    jobRole: 'General Duty Assistant',
    trainingCenter: 'Healthcare Training Academy, Mumbai',
    status: 'Assessment Scheduled'
  },
  { 
    id: 'C-1003', 
    name: 'Suresh Kumar', 
    email: 'suresh.kumar@example.com',
    phone: '7654321098',
    sector: 'Electronics',
    jobRole: 'Field Technician',
    trainingCenter: 'Electronics Skill Center, Bangalore',
    status: 'Assessment Completed'
  },
  { 
    id: 'C-1004', 
    name: 'Lakshmi Devi', 
    email: 'lakshmi.devi@example.com',
    phone: '6543210987',
    sector: 'Retail',
    jobRole: 'Retail Sales Associate',
    trainingCenter: 'Retail Skill Academy, Chennai',
    status: 'Certified'
  },
  { 
    id: 'C-1005', 
    name: 'Rahul Singh', 
    email: 'rahul.singh@example.com',
    phone: '5432109876',
    sector: 'Construction',
    jobRole: 'Assistant Mason',
    trainingCenter: 'Construction Skills Institute, Hyderabad',
    status: 'Failed'
  },
];

const CandidatesTab = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input 
            type="search" 
            placeholder="Search candidates..." 
            className="h-9" 
          />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="h-9">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Training Center</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs">{candidate.email}</span>
                    <span className="text-xs text-muted-foreground">{candidate.phone}</span>
                  </div>
                </TableCell>
                <TableCell>{candidate.sector}</TableCell>
                <TableCell>{candidate.jobRole}</TableCell>
                <TableCell>{candidate.trainingCenter}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={
                      candidate.status === 'Certified' ? 'default' : 
                      candidate.status === 'Failed' ? 'destructive' : 
                      candidate.status === 'Assessment Completed' ? 'secondary' : 
                      'outline'
                    }
                  >
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Assessment</DropdownMenuItem>
                      <DropdownMenuItem>View Results</DropdownMenuItem>
                      <DropdownMenuItem>Generate Certificate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default CandidatesTab;
