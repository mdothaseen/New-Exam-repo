
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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Search, Shield, Key } from 'lucide-react';

// Mock data for demonstration
const teamMembers = [
  { 
    id: 1, 
    name: 'Dr. Rajan Sharma', 
    email: 'rajan.sharma@ncvet.gov.in', 
    role: 'Administrator',
    department: 'NCVET',
    permissions: ['Full Access'],
    lastActive: '2 hours ago' 
  },
  { 
    id: 2, 
    name: 'Smt. Anita Desai', 
    email: 'anita.desai@msde.gov.in', 
    role: 'Supervisor',
    department: 'MSDE',
    permissions: ['Assessment Management', 'Report Access', 'User Management'],
    lastActive: '1 day ago' 
  },
  { 
    id: 3, 
    name: 'Shri. Vikram Mehta', 
    email: 'vikram.mehta@skillcouncil.org', 
    role: 'Coordinator',
    department: 'Skill Council',
    permissions: ['Content Management', 'Assessment View'],
    lastActive: '3 hours ago' 
  },
  { 
    id: 4, 
    name: 'Ms. Deepika Patel', 
    email: 'deepika.patel@nsdc.org', 
    role: 'Analytics Specialist',
    department: 'NSDC',
    permissions: ['Report Access', 'Dashboard Access'],
    lastActive: '5 days ago' 
  },
  { 
    id: 5, 
    name: 'Shri. Manish Tiwari', 
    email: 'manish.tiwari@skillaudit.org', 
    role: 'Auditor',
    department: 'Skill Audit',
    permissions: ['Assessment View', 'Report Access', 'Limited User View'],
    lastActive: 'Just now' 
  },
];

const TeamTab = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input 
            type="search" 
            placeholder="Search team members..." 
            className="h-9" 
          />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <Key className="h-4 w-4 mr-2" />
            Manage Permissions
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Shield className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg`} />
                    <AvatarFallback>{member.name.charAt(0)}{member.name.split(' ')[1].charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={member.role === 'Administrator' ? 'default' : 'outline'}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.map((permission, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{member.lastActive}</TableCell>
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
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuItem>Activity Log</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Suspend Access
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

export default TeamTab;
