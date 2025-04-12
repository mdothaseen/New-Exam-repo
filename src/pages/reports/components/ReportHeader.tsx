
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Share2 } from 'lucide-react';

interface ReportHeaderProps {
  title: string;
  description: string;
}

export const ReportHeader = ({ title, description }: ReportHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};
