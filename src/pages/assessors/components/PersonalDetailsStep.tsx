
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AssessorFormData } from '../types';

interface PersonalDetailsStepProps {
  formData: AssessorFormData;
  handleChange: (field: string, value: any) => void;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center pb-4">
        <div className="bg-purple-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-exam-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium ml-2">Personal Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={(e) => handleChange('name', e.target.value)} 
            required
          />
        </div>

        <div>
          <Label htmlFor="sidhId">SIDH ID <span className="text-red-500">*</span></Label>
          <Input 
            id="sidhId" 
            value={formData.sidhId} 
            onChange={(e) => handleChange('sidhId', e.target.value)} 
            required
          />
        </div>

        <div>
          <Label htmlFor="sidhPassword">SIDH Password <span className="text-red-500">*</span></Label>
          <Input 
            id="sidhPassword" 
            type="password"
            value={formData.sidhPassword} 
            onChange={(e) => handleChange('sidhPassword', e.target.value)} 
            required
          />
        </div>

        <div>
          <Label htmlFor="photo">Photo <span className="text-red-500">*</span></Label>
          <div className="flex items-center mt-1.5">
            <Button 
              variant="outline" 
              type="button" 
              className="w-full text-left flex justify-between items-center"
            >
              <span className="text-gray-500">Choose file</span>
              <Upload className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left",
                  !formData.dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth || undefined}
                onSelect={(date) => handleChange('dateOfBirth', date)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
          <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="religion">Religion</Label>
          <Select value={formData.religion} onValueChange={(value) => handleChange('religion', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Religion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hinduism">Hinduism</SelectItem>
              <SelectItem value="islam">Islam</SelectItem>
              <SelectItem value="christianity">Christianity</SelectItem>
              <SelectItem value="sikhism">Sikhism</SelectItem>
              <SelectItem value="buddhism">Buddhism</SelectItem>
              <SelectItem value="jainism">Jainism</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC</SelectItem>
              <SelectItem value="st">ST</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input 
            id="nationality" 
            value={formData.nationality} 
            onChange={(e) => handleChange('nationality', e.target.value)} 
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="languages">Languages Known</Label>
          <Textarea 
            id="languages" 
            value={formData.languages} 
            onChange={(e) => handleChange('languages', e.target.value)}
            placeholder="Enter languages separated by commas"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
