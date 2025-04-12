
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FormStep, stepTitles, AssessorFormData, AssessorAddFormProps } from './types';
import FormStepIndicator from './components/FormStepIndicator';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import ContactDetailsStep from './components/ContactDetailsStep';
import CertificationStep from './components/CertificationStep';
import StepPlaceholder from './components/StepPlaceholder';

const AssessorAddForm: React.FC<AssessorAddFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PersonalDetails);
  const [formData, setFormData] = useState<AssessorFormData>({
    // Personal Details
    name: '',
    sidhId: '',
    sidhPassword: '',
    dateOfBirth: null,
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
      toaDate: null,
      validityFrom: null,
      validityTill: null,
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.PersonalDetails:
        return <PersonalDetailsStep formData={formData} handleChange={handleChange} />;
      case FormStep.ContactDetails:
        return <ContactDetailsStep formData={formData} handleChange={handleChange} />;
      case FormStep.Certification:
        return <CertificationStep formData={formData} handleCertificationChange={handleCertificationChange} />;
      default:
        return <StepPlaceholder stepNumber={currentStep} stepTitle={stepTitles[currentStep]} />;
    }
  };

  return (
    <div className="space-y-6">
      <FormStepIndicator currentStep={currentStep} />
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
