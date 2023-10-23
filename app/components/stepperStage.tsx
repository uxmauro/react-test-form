import React, { useEffect } from 'react';

interface StepperStagesProps {
  activeStep: number;
  completedStep: number[];
  onStepChange: (stepId: number) => void;
}

function StepperStages({ activeStep, completedStep,  onStepChange }: StepperStagesProps) {
  const steps = [
    { id: 1, label: 'Initial info' },
    { id: 2, label: 'Password screen' },
    { id: 3, label: 'Review' },
  ];




  return (

        <div className="flex flex-col gap-[20px] fixed top-[200px] left-[80px] w-auto">

        {steps.map((step) => (
          <div
          className='step'
            key={step.id}
          >
            <div className={`step-box ${(completedStep.includes(step.id)) ? 'completed' : ""} ${activeStep === step.id ? 'active' : ""}`} ></div>
            <p>{step.label}</p>
          </div>
        ))}
        </div>

  );
}

export default StepperStages;
