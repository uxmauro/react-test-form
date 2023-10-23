import { useState } from "react"


interface OnNextFunction {
    onNext: () => void;
  }
  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}


const Password = ({ onNext }:OnNextFunction) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [passwordCharacter, setPasswordCharacter] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (event: InputChangeEvent ) => {
    const newPassword = event.target.value;
    if(newPassword.length < 8){
        setPasswordCharacter(false)
    }else if(newPassword.length > 16){
        setPasswordCharacter(false)
    }else{
        setPasswordCharacter(true)
    }
    setPassword(newPassword);
    validatePasswords(newPassword, repeatPassword);
  };

  const handleRepeatPasswordChange = (event: InputChangeEvent) => {
    const firstPassword = document.getElementById('password')as HTMLInputElement
    const value = firstPassword.value
    const newRepeatPassword = event.target.value;
  if(value == newRepeatPassword){
        setPasswordMatch(true)
    }else{
        setPasswordMatch(false)
    }
    setRepeatPassword(newRepeatPassword);
    validatePasswords(password, newRepeatPassword);
  };

  const validatePasswords = (newPassword:string, newRepeatPassword:string) => {
    if (newPassword.length >= 8 && newPassword.length <= 16 && newPassword === newRepeatPassword){
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  const handleContinue = () => {
    if (buttonEnabled) {
        onNext();
        }
  };

  return (
    <>
      <div className="inputField">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
         {!passwordCharacter && (
        <>
        <div className="error-icon"></div>
      <p className="error-text">Password must be 8-16 characters long</p>
        </>
    )}
      </div>
      <div className="inputField">
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          id="repeatPassword"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
         {!passwordMatch && (
        <>
        <div className="error-icon"></div>
      <p className="error-text">Passwords do not match</p>
        </>
    )}
      </div>
      <button
        id="continue"
        className={buttonEnabled ? 'enabled' : 'disabled'}
        onClick={handleContinue}
      >
        Continue
      </button>
    </>
  );
};

export default Password;
