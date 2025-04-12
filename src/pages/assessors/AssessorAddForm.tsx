
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

enum FormStep {
  PersonalDetails = 0,
  ContactDetails = 1,
  Education = 2,
  Experience = 3,
  Certification = 4,
  AssessmentAgencies = 5,
}

interface AssessorAddFormProps {
  onSubmit: (data: any) => void;
}

const stepTitles = [
  "Personal Details",
  "Contact Details",
  "Education",
  "Experience",
  "Certification",
  "Assessment Agencies"
];

const AssessorAddForm: React.FC<AssessorAddFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PersonalDetails);
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    sidhId: '',
    sidhPassword: '',
    dateOfBirth: null as Date | null,
    gender: '',
    category: '',
    religion: '',
    nationality: 'Indian',
    languages: '',
    photo: null,

    // Contact Details
    email: '',
    mobile: '',
    state: '',
    district: '',
    pinCode: '',
    address: '',

    // Education (would be an array in a real app)
    education: [{ degree: '', university: '', year: '', percentage: '' }],

    // Experience (would be an array in a real app)
    experience: [{ company: '', position: '', duration: '', description: '' }],

    // Certification (would be an array in a real app)
    certification: [{ 
      sector: '', 
      jobRole: '', 
      qpCode: '', 
      version: '',
      type: '',
      sponsor: '',
      toaDate: null as Date | null,
      validityFrom: null as Date | null,
      validityTill: null as Date | null,
      certificate: null,
    }],

    // Assessment Agencies (would be an array in a real app)
    assessmentAgencies: [{ name: '', domainExpert: false }]
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCertificationChange = (index: number, field: string, value: any) => {
    const updatedCertifications = [...formData.certification];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setFormData((prev) => ({ ...prev, certification: updatedCertifications }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitForm = () => {
    onSubmit(formData);
  };

  const isLastStep = currentStep === FormStep.AssessmentAgencies;

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2",
                index < currentStep 
                  ? "bg-green-500" 
                  : index === currentStep 
                    ? "bg-exam-purple" 
                    : "bg-gray-300"
              )}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-sm text-center hidden md:block">{title}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPersonalDetailsStep = () => {
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

  const renderContactDetailsStep = () => {
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

  const renderCertificationStep = () => {
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.PersonalDetails:
        return renderPersonalDetailsStep();
      case FormStep.ContactDetails:
        return renderContactDetailsStep();
      case FormStep.Certification:
        return renderCertificationStep();
      // Add other steps as needed
      default:
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Step {currentStep + 1}: {stepTitles[currentStep]}</h3>
            <p className="text-gray-500 mt-2">This step is being implemented</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderStepIndicator()}
      {renderCurrentStep()}
      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === FormStep.PersonalDetails}
        >
          Previous
        </Button>
        
        {isLastStep ? (
          <Button 
            type="button" 
            className="bg-exam-purple hover:bg-purple-800"
            onClick={handleSubmitForm}
          >
            Submit
          </Button>
        ) : (
          <Button 
            type="button" 
            className="bg-exam-purple hover:bg-purple-800"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessorAddForm;
