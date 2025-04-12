
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { sectorList } from '@/utils/sectorData';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by name, email or SIDH ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Select value={filterSector} onValueChange={setFilterSector}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Sector" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          <SelectItem value="all">All Sectors</SelectItem>
          {sectorList.map((sector) => (
            <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '-')}>
              {sector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssessorFilters;
