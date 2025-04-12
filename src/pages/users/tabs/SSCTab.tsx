
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
import { MoreHorizontal, Search, FileText, Users } from 'lucide-react';

// Mock data for demonstration
const sscList = [
  { 
    id: 1, 
    name: 'IT-ITeS Sector Skill Council', 
    shortName: 'NASSCOM',
    contact: 'contact@itssc.in',
    website: 'www.itssc.in',
    jobRoles: 42,
    status: 'Active',
    assessmentSets: 16
  },
  { 
    id: 2, 
    name: 'Healthcare Sector Skill Council', 
    shortName: 'HSSC',
    contact: 'info@hssc.in',
    website: 'www.hssc.in',
    jobRoles: 36,
    status: 'Active',
    assessmentSets: 12
  },
  { 
    id: 3, 
    name: 'Electronics Sector Skills Council of India', 
    shortName: 'ESSCI',
    contact: 'info@essci.in',
    website: 'www.essci.in',
    jobRoles: 28,
    status: 'Active',
    assessmentSets: 10
  },
  { 
    id: 4, 
    name: 'Automotive Skills Development Council', 
    shortName: 'ASDC',
    contact: 'info@asdc.in',
    website: 'www.asdc.in',
    jobRoles: 33,
    status: 'Active',
    assessmentSets: 14
  },
  { 
    id: 5, 
    name: 'Aerospace & Aviation Sector Skill Council', 
    shortName: 'AASSC',
    contact: 'contact@aassc.in',
    website: 'www.aassc.in',
    jobRoles: 22,
    status: 'Onboarding',
    assessmentSets: 6
  },
];

const SSCTab = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input 
            type="search" 
            placeholder="Search SSCs..." 
            className="h-9" 
          />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <FileText className="h-4 w-4 mr-2" />
            Job Roles
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Users className="h-4 w-4 mr-2" />
            Representatives
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>SSC Name</TableHead>
              <TableHead>Short Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-center">Job Roles</TableHead>
              <TableHead className="text-center">Assessment Sets</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sscList.map((ssc) => (
              <TableRow key={ssc.id}>
                <TableCell>{ssc.id}</TableCell>
                <TableCell className="font-medium">{ssc.name}</TableCell>
                <TableCell>{ssc.shortName}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs">{ssc.contact}</span>
                    <span className="text-xs text-muted-foreground">{ssc.website}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{ssc.jobRoles}</TableCell>
                <TableCell className="text-center">{ssc.assessmentSets}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={ssc.status === 'Active' ? 'default' : 'outline'}
                  >
                    {ssc.status}
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Information</DropdownMenuItem>
                      <DropdownMenuItem>Manage Job Roles</DropdownMenuItem>
                      <DropdownMenuItem>View Assessment Sets</DropdownMenuItem>
                      <DropdownMenuItem>Manage Representatives</DropdownMenuItem>
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

export default SSCTab;
