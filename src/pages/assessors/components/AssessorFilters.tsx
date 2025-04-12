
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AssessorFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterSector: string;
  setFilterSector: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
}

const AssessorFilters: React.FC<AssessorFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  filterSector, 
  setFilterSector, 
  filterStatus, 
  setFilterStatus 
}) => {
  return (
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
            <SelectItem value="">All Sectors</SelectItem>
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
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AssessorFilters;
