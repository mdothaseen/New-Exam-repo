
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  description: string;
  value: string | number;
  trend?: string;
  children?: React.ReactNode;
}

export const StatCard = ({ title, description, value, trend, children }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${trend && trend.includes('+') ? 'text-green-500' : ''}`}>{value}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
        <div className="mt-4 h-32 flex items-center justify-center text-muted-foreground">
          {children || 'Chart will be displayed here'}
        </div>
      </CardContent>
    </Card>
  );
};
