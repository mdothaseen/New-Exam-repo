
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Share2 } from 'lucide-react';

interface ReportHeaderProps {
  title: string;
  description: string;
}

export const ReportHeader = ({ title, description }: ReportHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#333333]">{title}</h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="bg-white hover:bg-[#F5F6FA] text-[#333333] border-[#E5E7EB]">
          <Filter className="h-4 w-4 mr-2 text-[#4A90E2]" />
          Filter
        </Button>
        <Button variant="outline" className="bg-white hover:bg-[#F5F6FA] text-[#333333] border-[#E5E7EB]">
          <Download className="h-4 w-4 mr-2 text-[#4A90E2]" />
          Export
        </Button>
        <Button 
          className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};
