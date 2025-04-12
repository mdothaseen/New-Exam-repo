
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, Building, User } from "lucide-react";
import BasicInfoFields from './BasicInfoFields';
import TrainingCenterFields from './TrainingCenterFields';
import AssessmentFields from './AssessmentFields';
import { examFormSchema, ExamFormValues } from '../schema';

const ExamForm: React.FC = () => {
  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      schemeName: '',
      batchId: '',
      sectorName: '',
      jobRole: '',
      qpCode: '',
      tpName: '',
      tcName: '',
      address: '',
      state: '',
      district: '',
      candidates: '',
      scheduled: '',
      assessorName: '',
      assessorId: '',
    },
  });

  const onSubmit = (values: ExamFormValues) => {
    console.log(values);
    toast({
      title: 'Exam Scheduled',
      description: `Successfully scheduled exam for ${values.schemeName}`,
    });
    form.reset();
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-purple-600">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-2xl text-purple-800 flex items-center">
          <ClipboardCheck className="mr-2 h-6 w-6" />
          Schedule New Exam
        </CardTitle>
        <CardDescription className="text-base">
          Fill out the details below to schedule a new assessment exam
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="w-full mb-8">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="basic" className="flex items-center">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  <span>Basic Information</span>
                </TabsTrigger>
                <TabsTrigger value="center" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Training Center</span>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Assessment Details</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BasicInfoFields control={form.control} />
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    type="button" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => document.querySelector('[data-value="center"]')?.click()}
                  >
                    Next Step
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="center" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TrainingCenterFields control={form.control} />
                </div>
                <div className="flex justify-between mt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="basic"]')?.click()}
                  >
                    Previous Step
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => document.querySelector('[data-value="assessment"]')?.click()}
                  >
                    Next Step
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="assessment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AssessmentFields control={form.control} />
                </div>
                <div className="flex justify-between mt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="center"]')?.click()}
                  >
                    Previous Step
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Schedule Exam
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="bg-gray-50 border-t px-6 py-4">
        <p className="text-sm text-gray-500">
          Please ensure all fields are accurately filled before scheduling the exam.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ExamForm;
