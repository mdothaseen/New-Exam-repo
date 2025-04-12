
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface AssessorHeaderProps {
  onAddClick: () => void;
}

const AssessorHeader: React.FC<AssessorHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Assessors</h2>
        <p className="text-muted-foreground">
          Manage your assessors and their certifications
        </p>
      </div>
      
      <Button 
        className="bg-exam-purple hover:bg-purple-800" 
        onClick={onAddClick}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Assessor
      </Button>
    </div>
  );
};

export default AssessorHeader;
