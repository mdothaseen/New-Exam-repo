
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import ExamForm from './scheduleExam/components/ExamForm';
import { Calendar, Users, MapPin } from 'lucide-react';

const ScheduleExam = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Schedule Exam</h2>
            <p className="text-muted-foreground">
              Create a new exam schedule by filling out the form below
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-purple-50 border border-purple-100 rounded-lg px-4 py-2">
              <Calendar className="h-4 w-4 text-purple-600 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-green-50 border border-green-100 rounded-lg px-4 py-2">
              <Users className="h-4 w-4 text-green-600 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Assessors</p>
                <p className="text-sm font-medium">12 Available</p>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
              <MapPin className="h-4 w-4 text-blue-600 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Centers</p>
                <p className="text-sm font-medium">48 Active</p>
              </div>
            </div>
          </div>
        </div>

        <ExamForm />
      </div>
    </AdminLayout>
  );
};

export default ScheduleExam;
