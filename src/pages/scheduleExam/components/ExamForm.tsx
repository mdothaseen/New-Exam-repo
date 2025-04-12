
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
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
    <Card>
      <CardHeader>
        <CardTitle>Exam Details</CardTitle>
        <CardDescription>Enter all required information to schedule a new exam</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <BasicInfoFields control={form.control} />
              <TrainingCenterFields control={form.control} />
              <AssessmentFields control={form.control} />
            </div>
            
            <Button type="submit" className="bg-exam-purple hover:bg-purple-800">
              Schedule Exam
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExamForm;
