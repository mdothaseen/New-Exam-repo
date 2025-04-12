
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/card';
import { mockAssessors } from './mock-data';
import { AssessorFormData } from './types';
import AssessorHeader from './components/AssessorHeader';
import AssessorFilters from './components/AssessorFilters';
import AssessorTable from './components/AssessorTable';
import AddAssessorDialog from './components/AddAssessorDialog';

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

  const handleAddAssessor = (data: AssessorFormData) => {
    console.log('New assessor data:', data);
    // Here you would normally add the assessor to your database
    setDialogOpen(false);
    // You could also add the new assessor to your local state
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AssessorHeader onAddClick={() => setDialogOpen(true)} />
        
        <Card className="p-6">
          <AssessorFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterSector={filterSector}
            setFilterSector={setFilterSector}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          
          <AssessorTable assessors={filteredAssessors} />
        </Card>
      </div>

      <AddAssessorDialog 
        isOpen={dialogOpen} 
        setIsOpen={setDialogOpen}
        onAddAssessor={handleAddAssessor}
      />
    </AdminLayout>
  );
};

export default Assessors;
