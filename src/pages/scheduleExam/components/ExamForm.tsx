import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, Building, User, ChevronRight, ChevronLeft, CheckCircle, X } from "lucide-react";
import BasicInfoFields from './BasicInfoFields';
import TrainingCenterFields from './TrainingCenterFields';
import AssessmentFields from './AssessmentFields';
import { examFormSchema, ExamFormValues } from '../schema';

interface ExamFormProps {
  onExamScheduled?: (values: ExamFormValues) => void;
  onCancel?: () => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ onExamScheduled, onCancel }) => {
  // Add state to track the active tab
  const [activeTab, setActiveTab] = useState("basic");
  
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
    
    // Call the callback with the form values if provided
    if (onExamScheduled) {
      onExamScheduled(values);
    } else {
      form.reset();
      // Reset to first tab after submission
      setActiveTab("basic");
    }
  };

  // Helper functions for tab navigation
  const goToNextTab = () => {
    if (activeTab === "basic") setActiveTab("center");
    else if (activeTab === "center") setActiveTab("assessment");
  };

  const goToPrevTab = () => {
    if (activeTab === "assessment") setActiveTab("center");
    else if (activeTab === "center") setActiveTab("basic");
  };

  // Progress indicator
  const getProgress = () => {
    if (activeTab === "basic") return 33;
    if (activeTab === "center") return 66;
    return 100;
  };

  // Function to safely trigger click on tab
  const goToTab = (tabValue: string) => {
    const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement | null;
    if (tabElement) {
      tabElement.click();
    }
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-purple-600">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-purple-800 flex items-center">
              <ClipboardCheck className="mr-2 h-6 w-6" />
              Schedule New Exam
            </CardTitle>
            <CardDescription className="text-base">
              Fill out the details below to schedule a new assessment exam
            </CardDescription>
          </div>
          {onCancel && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCancel}
              className="h-8 w-8 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${activeTab === "basic" || activeTab === "center" || activeTab === "assessment" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>1</div>
              <div className={`h-1 w-12 ${activeTab === "center" || activeTab === "assessment" ? "bg-purple-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${activeTab === "center" || activeTab === "assessment" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>2</div>
              <div className={`h-1 w-12 ${activeTab === "assessment" ? "bg-purple-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${activeTab === "assessment" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>3</div>
            </div>
          </div>
        </div>
        
        {/* Mobile progress bar */}
        <div className="mt-4 md:hidden">
          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-purple-600 transition-all duration-300 ease-in-out"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
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
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => document.querySelector('[data-value="assessment"]')?.click()}
                  >
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
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
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 flex items-center"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Schedule Exam
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="bg-gray-50 rounded-b-lg px-6 py-4">
        <p className="text-sm text-gray-500">
          Please ensure all fields are accurately filled before scheduling the exam.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ExamForm;
