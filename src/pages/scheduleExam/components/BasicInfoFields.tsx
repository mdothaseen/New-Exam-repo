
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sectorList } from '@/utils/sectorData';
import { Control } from 'react-hook-form';
import { ExamFormValues } from '../schema';

interface BasicInfoFieldsProps {
  control: Control<ExamFormValues>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="schemeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Scheme Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter scheme name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="batchId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Batch ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter batch ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="sectorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sector Name</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sector" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-80">
                {sectorList.map((sector) => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Role</FormLabel>
            <FormControl>
              <Input placeholder="Enter job role" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;
