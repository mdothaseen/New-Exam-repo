
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ResultData {
  batchId: string;
  title: string;
  date: string;
  candidates: number;
  passed: number;
  passRate: number;
  avgScore: number;
}

interface RecentResultsProps {
  data: ResultData[];
}

export const RecentResults = ({ data }: RecentResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Latest assessment batch results</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch</TableHead>
              <TableHead className="text-center">Candidates</TableHead>
              <TableHead className="text-center">Passed</TableHead>
              <TableHead className="text-center">Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((result) => (
              <TableRow key={result.batchId}>
                <TableCell>
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-muted-foreground">{result.date}</div>
                </TableCell>
                <TableCell className="text-center">{result.candidates}</TableCell>
                <TableCell className="text-center">{result.passed}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={result.passRate >= 80 ? "default" : "secondary"}
                  >
                    {result.passRate}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
