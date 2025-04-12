
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssessorFormData } from '../types';

interface ContactDetailsStepProps {
  formData: AssessorFormData;
  handleChange: (field: string, value: any) => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center pb-4">
        <div className="bg-purple-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-exam-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium ml-2">Contact and Address Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input 
            id="email" 
            type="email"
            value={formData.email} 
            onChange={(e) => handleChange('email', e.target.value)} 
            required
          />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
          <Input 
            id="mobile" 
            value={formData.mobile} 
            onChange={(e) => handleChange('mobile', e.target.value)} 
            required
          />
        </div>

        <div>
          <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
          <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
              {/* Add more states as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="district">District <span className="text-red-500">*</span></Label>
          <Select value={formData.district} onValueChange={(value) => handleChange('district', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {/* Districts would be populated based on selected state */}
              <SelectItem value="new-delhi">New Delhi</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="bengaluru">Bengaluru</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pinCode">Pin Code <span className="text-red-500">*</span></Label>
          <Input 
            id="pinCode" 
            value={formData.pinCode} 
            onChange={(e) => handleChange('pinCode', e.target.value)} 
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Complete Address <span className="text-red-500">*</span></Label>
          <Textarea 
            id="address" 
            value={formData.address} 
            onChange={(e) => handleChange('address', e.target.value)}
            required
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsStep;
