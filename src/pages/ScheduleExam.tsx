
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  schemeName: z.string().min(1, { message: 'Scheme name is required' }),
  batchId: z.string().min(1, { message: 'Batch ID is required' }),
  sectorName: z.string().min(1, { message: 'Sector name is required' }),
  jobRole: z.string().min(1, { message: 'Job role is required' }),
  qpCode: z.string().min(1, { message: 'QP code is required' }),
  tpName: z.string().min(1, { message: 'TP name is required' }),
  tcName: z.string().min(1, { message: 'TC name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  candidates: z.string().min(1, { message: 'Number of candidates is required' })
    .refine((val) => !isNaN(Number(val)), { message: 'Must be a number' }),
  scheduled: z.string().min(1, { message: 'Scheduled count is required' })
    .refine((val) => !isNaN(Number(val)), { message: 'Must be a number' }),
  assessorName: z.string().min(1, { message: 'Assessor name is required' }),
  assessorId: z.string().min(1, { message: 'Assessor ID is required' }),
  examDate: z.date({ required_error: 'Exam date is required' })
});

const ScheduleExam = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemeName: '',
      batchId: '',
      sectorName: '',
      jobRole: '',
      qpCode: '',
      tpName: '',
      tcName: '',
      address: '',
      candidates: '',
      scheduled: '',
      assessorName: '',
      assessorId: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: 'Exam Scheduled',
      description: `Successfully scheduled exam for ${values.schemeName}`,
    });
    form.reset();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule Exam</h2>
          <p className="text-muted-foreground">
            Create a new exam schedule by filling out the form below
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Enter all required information to schedule a new exam</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
                    name="sectorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter sector name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
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
                  
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter full address" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="bg-exam-purple hover:bg-purple-800">
                  Schedule Exam
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ScheduleExam;
