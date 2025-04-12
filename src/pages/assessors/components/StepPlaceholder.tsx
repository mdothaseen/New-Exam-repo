
import React from 'react';

interface StepPlaceholderProps {
  stepNumber: number;
  stepTitle: string;
}

const StepPlaceholder: React.FC<StepPlaceholderProps> = ({ stepNumber, stepTitle }) => {
  return (
    <div className="p-6 text-center">
      <h3 className="text-lg font-medium">Step {stepNumber + 1}: {stepTitle}</h3>
      <p className="text-gray-500 mt-2">This step is being implemented</p>
    </div>
  );
};

export default StepPlaceholder;
