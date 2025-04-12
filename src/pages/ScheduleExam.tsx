
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import ExamForm from './scheduleExam/components/ExamForm';

const ScheduleExam = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule Exam</h2>
          <p className="text-muted-foreground">
            Create a new exam schedule by filling out the form below
          </p>
        </div>

        <ExamForm />
      </div>
    </AdminLayout>
  );
};

export default ScheduleExam;
