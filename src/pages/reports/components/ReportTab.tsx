
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart } from 'lucide-react';

interface ReportTabProps {
  title: string;
  description: string;
  showGenerateButton?: boolean;
  children?: React.ReactNode;
}

export const ReportTab = ({ title, description, showGenerateButton, children }: ReportTabProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
          {showGenerateButton && (
            <Button>
              <FileBarChart className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children || (
          <div className="text-center py-8 text-muted-foreground">
            Report content will be displayed here
          </div>
        )}
      </CardContent>
    </Card>
  );
};
