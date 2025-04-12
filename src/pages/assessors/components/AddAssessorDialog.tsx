
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AssessorAddForm from '../AssessorAddForm';
import { AssessorFormData } from '../types';

interface AddAssessorDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddAssessor: (data: AssessorFormData) => void;
}

const AddAssessorDialog: React.FC<AddAssessorDialogProps> = ({ isOpen, setIsOpen, onAddAssessor }) => {
  const handleAddAssessor = (data: AssessorFormData) => {
    onAddAssessor(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
  );
};

export default AddAssessorDialog;
