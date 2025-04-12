
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
import { MoreHorizontal, Search, UserCheck, UserCog } from 'lucide-react';

// Mock data for demonstration
const assessors = [
  { 
    id: 1, 
    name: 'Rajesh Kumar', 
    email: 'rajesh.kumar@example.com', 
    status: 'Active', 
    sector: 'IT-ITES',
    assessmentsDone: 156, 
    dateJoined: '2023-05-12' 
  },
  { 
    id: 2, 
    name: 'Priya Singh', 
    email: 'priya.singh@example.com', 
    status: 'Active', 
    sector: 'Healthcare',
    assessmentsDone: 124, 
    dateJoined: '2023-06-23' 
  },
  { 
    id: 3, 
    name: 'Amit Sharma', 
    email: 'amit.sharma@example.com', 
    status: 'Inactive', 
    sector: 'Electronics',
    assessmentsDone: 89, 
    dateJoined: '2023-04-18' 
  },
  { 
    id: 4, 
    name: 'Sunita Reddy', 
    email: 'sunita.reddy@example.com', 
    status: 'Pending Approval', 
    sector: 'Retail',
    assessmentsDone: 0, 
    dateJoined: '2023-08-05' 
  },
  { 
    id: 5, 
    name: 'Vikas Gupta', 
    email: 'vikas.gupta@example.com', 
    status: 'Active', 
    sector: 'Construction',
    assessmentsDone: 72, 
    dateJoined: '2023-07-14' 
  },
];

const AssessorsTab = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input 
            type="search" 
            placeholder="Search assessors..." 
            className="h-9" 
          />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <UserCheck className="h-4 w-4 mr-2" />
            Verify Selected
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <UserCog className="h-4 w-4 mr-2" />
            Manage Permissions
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Assessments</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessors.map((assessor) => (
              <TableRow key={assessor.id}>
                <TableCell>{assessor.id}</TableCell>
                <TableCell className="font-medium">{assessor.name}</TableCell>
                <TableCell>{assessor.email}</TableCell>
                <TableCell>{assessor.sector}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={
                      assessor.status === 'Active' ? 'default' : 
                      assessor.status === 'Inactive' ? 'secondary' : 'outline'
                    }
                  >
                    {assessor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{assessor.assessmentsDone}</TableCell>
                <TableCell>{assessor.dateJoined}</TableCell>
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
                      <DropdownMenuItem>Assign Assessments</DropdownMenuItem>
                      <DropdownMenuItem>View Activity</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Deactivate Account
                      </DropdownMenuItem>
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

export default AssessorsTab;
