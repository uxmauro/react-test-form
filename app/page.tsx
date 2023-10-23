'use client';

import { createContext } from 'react';
import Link from 'next/link';
import { useState } from 'react'
import './globals.css'
import StepperStages from './components/stepperStage';
import Password from  './components/password'
import Username from  './components/username'
import Review from  './components/review'



  export default function Home() {

    //Steps indicator
    const [activeStep, setActiveStep] = useState(1);
    const [completedStep, setCompletedStep] = useState<number[]>([]);
    const [activeComponent, setActiveComponent] = useState(1);

    //Subtext
    const [displayText, setDisplayText] = useState('Initial Info');

    //input fields
    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [countryInput, setCountryInput] = useState('')

    const handleStepChange = (step:number) => {
      setActiveStep(step);
    };

    const formSubtext = ["Password screen", "Review screen"]

    const handleUserInfo = (inputValue:string, emailInput:string, selectedCountry:string) => {
      handleContinue()
      setUsernameInput(inputValue)
      setEmailInput(emailInput)
      setCountryInput(selectedCountry)
    }


    const handleContinue = () => {
      setActiveStep((prevStep) => prevStep < 3 ? prevStep + 1 : prevStep = 3); // Increment activeStep
      setCompletedStep([...completedStep, activeStep]); // Increment Completed
      setActiveComponent((prev) => (prev === 3 ? 3 : prev + 1));
      const currentIndex = formSubtext.indexOf(displayText);
      const nextIndex = (currentIndex + 1) % formSubtext.length;
      setDisplayText(formSubtext[nextIndex]);

  };


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
    <StepperStages activeStep={activeStep} completedStep={completedStep} onStepChange={handleStepChange} />
        <div className="flex flex-col align-middle items-center">

        <h1 >Super test form</h1>
        <p className=' mb-[60px]'>{displayText}</p>

          <div className='form'>
            {activeComponent === 1 && <Username onNext = {handleUserInfo}/> }
            {activeComponent === 2 && <Password onNext = {handleContinue}/> }
            {activeComponent === 3 && <Review usernameInput={usernameInput} emailInput={emailInput} countryInput={countryInput}  />}
          </div>

    </div>
    </main>
  )
}
