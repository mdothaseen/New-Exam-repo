
import React from 'react';
import { cn } from "@/lib/utils";
import { stepTitles, FormStep } from '../types';

interface FormStepIndicatorProps {
  currentStep: FormStep;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({ currentStep }) => {
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

export default FormStepIndicator;
