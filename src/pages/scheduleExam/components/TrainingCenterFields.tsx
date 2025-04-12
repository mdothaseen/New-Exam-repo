
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { ExamFormValues } from '../schema';

interface TrainingCenterFieldsProps {
  control: Control<ExamFormValues>;
}

const TrainingCenterFields: React.FC<TrainingCenterFieldsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="qpCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>QP Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter QP code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="tpName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>TP Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter TP name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tcName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>TC Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter TC name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter full address" {...field} rows={3} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TrainingCenterFields;
