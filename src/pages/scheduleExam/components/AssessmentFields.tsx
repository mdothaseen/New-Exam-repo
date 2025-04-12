
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Control } from 'react-hook-form';
import { ExamFormValues } from '../schema';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AssessmentFieldsProps {
  control: Control<ExamFormValues>;
}

const AssessmentFields: React.FC<AssessmentFieldsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="candidates"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Candidates</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of candidates" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="scheduled"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Scheduled</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter scheduled count" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="assessorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assessor Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter assessor name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="assessorId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assessor ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter assessor ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="examDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Exam Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AssessmentFields;
