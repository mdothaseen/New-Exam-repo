
import React from 'react';
import { Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export interface Assessor {
  id: number;
  name: string;
  sidhId: string;
  email: string;
  mobile: string;
  sector: string;
  state: string;
  district: string;
  status: string;
  certifications: number;
}

interface AssessorTableProps {
  assessors: Assessor[];
}

const AssessorTable: React.FC<AssessorTableProps> = ({ assessors }) => {
  return (
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
          {assessors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No assessors found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            assessors.map((assessor) => (
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
  );
};

export default AssessorTable;
