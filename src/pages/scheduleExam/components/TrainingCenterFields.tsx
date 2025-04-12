
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { ExamFormValues } from '../schema';
import { indianStates, indianDistricts } from '@/utils/indiaData';

interface TrainingCenterFieldsProps {
  control: Control<ExamFormValues>;
}

const TrainingCenterFields: React.FC<TrainingCenterFieldsProps> = ({ control }) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState && indianDistricts[selectedState]) {
      setDistricts(indianDistricts[selectedState]);
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  return (
    <>
      <FormField
        control={control}
        name="tpName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Training Partner Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter training partner name" {...field} />
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
            <FormLabel>Training Center Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter training center name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedState(value);
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-80">
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel>District</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={!selectedState}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={selectedState ? "Select a district" : "Select a state first"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-80">
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <Textarea placeholder="Enter complete address" className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TrainingCenterFields;
