
import { useState } from 'react'
import CountryDropdown from './countryDropdown';



interface OnNextFunction {
    onNext: (inputValue: string, email: string, selectedCountry: string) => void;
  }

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

function emailCheck(email:string) {
    // Regular expression for a simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
    return emailRegex.test(email);

  }




const Username = ({onNext}:OnNextFunction) => {

    // email state
    const [email, setEmail] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

    // username state
    const [isEmailFilled, setEmailFilled] = useState<boolean>(false);
    const [isInputFilled, setInputFilled] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);

    //country select state
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [isCountrySelected, setIsCountrySelected] = useState<boolean>(true);


    // button state
    const [buttonEnabled, setbuttonEnabled] = useState(false);




    const handleInputFilled = (event:InputChangeEvent) => {
        const value = event.target.value;
        if(value != ""){
            setInputFilled(true);
            if(isEmailFilled && isInputFilled)
            setbuttonEnabled(true)
        }

      }
    const handleEmailFilled = (event:InputChangeEvent) => {
        const value = event.target.value;
        if(value != "" ){
            setEmailFilled(true);
            if(isEmailFilled && isInputFilled)
            setbuttonEnabled(true)
        }

      }



      const handleInputChange = () => {
        const usernamevalue = document.getElementById('username') as HTMLInputElement
         const value = usernamevalue.value;
          setInputValue(value)
       // Check character count and update isValid state
       if (value.length >= 4 && value.length <= 12) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }


    const handleEmailInput = () => {
        const emailvalue = document.getElementById('email') as HTMLInputElement
        const value = emailvalue.value;
        setEmail(value);
        if (emailCheck(value)) {
          setIsValidEmail(true);
        } else {
          setIsValidEmail(false);
        }
      };


    const handleSelectCountryInput = () => {
            if(selectedCountry == ''){
                setIsCountrySelected(false)
            }
      };


    const handleContinue = () => {
     if(buttonEnabled){
        handleInputChange()
        handleEmailInput()
        handleSelectCountryInput()
        if(isValidEmail && inputValue && isCountrySelected){
           onNext(inputValue, email, selectedCountry);
        }
      }
    };

      const handleSelectCountry = (country:string) => {
        setSelectedCountry(country);
        setIsCountrySelected(true);
        setbuttonEnabled(true)
      }


    return (
      <>
      <div className="inputField">
      <label htmlFor="myInput">Username</label>
      <input type="text" id="username" onChange={handleInputFilled}
        placeholder="Input username"
       className={isValid ? 'valid' : 'invalid'}  />
       {!isValid && (
        <>
      <div className="error-icon"></div>
      <p className="error-text">Input must be between 4 and 12 characters.</p>
        </>
    )}
      </div>
      <div className="inputField">
      <label htmlFor="body">Email</label>
      <input type="text" id="email" placeholder="Input email"   onChange={handleEmailFilled}/>
      {!isValidEmail && (
        <>
        <div className="error-icon"></div>
      <p className="error-text">Invalid email address</p>
        </>
    )}
      </div>
      <div className="inputField">
      <label htmlFor="body">Country</label>
      <CountryDropdown selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry}/>
      {!isCountrySelected && (
        <>
          <p className='error-text'> Required</p>
        </>
      )}

      </div>
      <button id ="continue" className={ buttonEnabled ? 'enabled' : 'disabled'} onClick={handleContinue}>Continue</button>
    </>
    );
  };

  export default Username;

