
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AssessorFormData } from '../types';

interface CertificationStepProps {
  formData: AssessorFormData;
  handleCertificationChange: (index: number, field: string, value: any) => void;
}

const CertificationStep: React.FC<CertificationStepProps> = ({ formData, handleCertificationChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center pb-4">
        <div className="bg-purple-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-exam-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium ml-2">Certification Details</h3>
      </div>

      <div className="border rounded-md p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="sector">Sector Name</Label>
            <Select 
              value={formData.certification[0].sector} 
              onValueChange={(value) => handleCertificationChange(0, 'sector', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it-ites">IT-ITES</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="jobRole">Job Role</Label>
            <Select 
              value={formData.certification[0].jobRole} 
              onValueChange={(value) => handleCertificationChange(0, 'jobRole', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Job Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
                <SelectItem value="sales">Sales Associate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="qpCode">QP Code</Label>
            <Input 
              id="qpCode" 
              value={formData.certification[0].qpCode} 
              onChange={(e) => handleCertificationChange(0, 'qpCode', e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="version">Version</Label>
            <Input 
              id="version" 
              value={formData.certification[0].version} 
              onChange={(e) => handleCertificationChange(0, 'version', e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="type">Type</Label>
            <Select 
              value={formData.certification[0].type} 
              onValueChange={(value) => handleCertificationChange(0, 'type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="sponsor">Sponsor</Label>
            <Input 
              id="sponsor" 
              value={formData.certification[0].sponsor} 
              onChange={(e) => handleCertificationChange(0, 'sponsor', e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="toaDate">TOA Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    !formData.certification[0].toaDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.certification[0].toaDate ? 
                    format(formData.certification[0].toaDate, "PPP") : 
                    <span>Select Date</span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.certification[0].toaDate || undefined}
                  onSelect={(date) => handleCertificationChange(0, 'toaDate', date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="validityFrom">Validity From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    !formData.certification[0].validityFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.certification[0].validityFrom ? 
                    format(formData.certification[0].validityFrom, "PPP") : 
                    <span>Select Date</span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.certification[0].validityFrom || undefined}
                  onSelect={(date) => handleCertificationChange(0, 'validityFrom', date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="validityTill">Validity Till</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    !formData.certification[0].validityTill && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.certification[0].validityTill ? 
                    format(formData.certification[0].validityTill, "PPP") : 
                    <span>Select Date</span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.certification[0].validityTill || undefined}
                  onSelect={(date) => handleCertificationChange(0, 'validityTill', date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="certificate">Certificate</Label>
            <div className="flex items-center mt-1.5">
              <Button 
                variant="outline" 
                type="button" 
                className="w-full text-left flex justify-between items-center"
              >
                <span className="text-gray-500">Browse</span>
                <Upload className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" className="bg-blue-500 hover:bg-blue-600">
            + Add Certification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificationStep;
