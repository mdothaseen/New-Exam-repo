
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AssessorAddForm from './AssessorAddForm';

// Mock data for demonstration
const mockAssessors = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    sidhId: 'SIDH12345',
    email: 'rajesh@example.com',
    mobile: '+91 9876543210',
    sector: 'IT-ITES',
    state: 'Delhi',
    district: 'New Delhi',
    status: 'Active',
    certifications: 3
  },
  {
    id: 2,
    name: 'Priya Singh',
    sidhId: 'SIDH67890',
    email: 'priya@example.com',
    mobile: '+91 8765432109',
    sector: 'Healthcare',
    state: 'Maharashtra',
    district: 'Mumbai',
    status: 'Active',
    certifications: 2
  },
  {
    id: 3,
    name: 'Amit Sharma',
    sidhId: 'SIDH10111',
    email: 'amit@example.com',
    mobile: '+91 7654321098',
    sector: 'Electronics',
    state: 'Karnataka',
    district: 'Bengaluru',
    status: 'Pending',
    certifications: 1
  },
  {
    id: 4,
    name: 'Sunita Reddy',
    sidhId: 'SIDH12131',
    email: 'sunita@example.com',
    mobile: '+91 6543210987',
    sector: 'Retail',
    state: 'Tamil Nadu',
    district: 'Chennai',
    status: 'Inactive',
    certifications: 4
  },
  {
    id: 5,
    name: 'Vikas Gupta',
    sidhId: 'SIDH14151',
    email: 'vikas@example.com',
    mobile: '+91 5432109876',
    sector: 'Construction',
    state: 'Gujarat',
    district: 'Ahmedabad',
    status: 'Active',
    certifications: 2
  },
];

const Assessors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredAssessors = mockAssessors.filter(assessor => {
    const matchesSearch = searchTerm === '' || 
      assessor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assessor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessor.sidhId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSector = filterSector === '' || assessor.sector === filterSector;
    const matchesStatus = filterStatus === '' || assessor.status === filterStatus;
    
    return matchesSearch && matchesSector && matchesStatus;
  });

  const handleAddAssessor = (data: any) => {
    console.log('New assessor data:', data);
    // Here you would normally add the assessor to your database
    setDialogOpen(false);
    // You could also add the new assessor to your local state
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Assessors</h2>
            <p className="text-muted-foreground">
              Manage your assessors and their certifications
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-purple hover:bg-purple-800">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Assessor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Assessor</DialogTitle>
                <DialogDescription>
                  Fill out the following form to add a new assessor to the system.
                </DialogDescription>
              </DialogHeader>
              <AssessorAddForm onSubmit={handleAddAssessor} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterSector} onValueChange={setFilterSector}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sectors">All Sectors</SelectItem>
                  <SelectItem value="IT-ITES">IT-ITES</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SIDH ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Certifications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No assessors found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssessors.map((assessor) => (
                    <TableRow key={assessor.id}>
                      <TableCell className="font-medium">{assessor.name}</TableCell>
                      <TableCell>{assessor.sidhId}</TableCell>
                      <TableCell>{assessor.email}</TableCell>
                      <TableCell>{assessor.mobile}</TableCell>
                      <TableCell>{assessor.sector}</TableCell>
                      <TableCell>{assessor.district}, {assessor.state}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            assessor.status === 'Active' ? 'default' : 
                            assessor.status === 'Inactive' ? 'destructive' : 'outline'
                          }
                        >
                          {assessor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{assessor.certifications}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant={assessor.status === 'Active' ? 'outline' : 'default'} 
                            size="icon"
                            title={assessor.status === 'Active' ? 'Deactivate' : 'Activate'}
                            className={assessor.status === 'Active' ? '' : 'bg-green-600 hover:bg-green-700'}
                          >
                            {assessor.status === 'Active' ? (
                              <XCircle className="h-4 w-4 text-destructive" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Assessors;
