
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart4 } from 'lucide-react';

interface SectorData {
  sector: string;
  assessments: number;
  passRate: number;
  avgScore: number;
}

interface SectorPerformanceProps {
  data: SectorData[];
}

export const SectorPerformance = ({ data }: SectorPerformanceProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription>Performance metrics by sector</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <BarChart4 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sector</TableHead>
              <TableHead className="text-center">Assessments</TableHead>
              <TableHead className="text-center">Pass Rate</TableHead>
              <TableHead className="text-center">Avg Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((sector) => (
              <TableRow key={sector.sector}>
                <TableCell className="font-medium">{sector.sector}</TableCell>
                <TableCell className="text-center">{sector.assessments}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={sector.passRate >= 80 ? "default" : "secondary"}
                  >
                    {sector.passRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{sector.avgScore}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
