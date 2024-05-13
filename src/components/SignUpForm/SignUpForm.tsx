import React, { useState, ChangeEvent } from 'react';
import Button from '../Button/Button';
import './styles.css';

function SignUpForm(): React.ReactElement {
  const [dateFocused, setDateFocused] = useState(false);
  const [country, setCountry] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (emailString: string) => {
    const re =
      /^(([^<>()\\.,;:@"]+(\.[^<>()\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(emailString.toLowerCase());
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (passwordString: string) => {
    if (!/^[A-Za-z0-9!@#$%^&*()_+\-={};':"\\|,.<>?]+$/.test(passwordString)) {
      return 'Password can only contain English letters, digits, and special chars.';
    }
    if (!/[A-Z]/.test(passwordString)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(passwordString)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(passwordString)) {
      return 'Password must contain at least one digit';
    }
    if (passwordString.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const error = validatePassword(event.target.value);
    setPasswordError(error);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <form
      className="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault(); /* your submit logic here */
      }}
    >
      <span>Enter your details below</span>
      <div className="input-container">
        <input id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <div className="input-container">
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <div className="input-container">
        <input type="text" placeholder="Name" />
      </div>
      <div className="input-container">
        <input type="text" placeholder="Surname" />
      </div>
      <div className="input-container">
        <input
          type={dateFocused ? 'date' : 'text'}
          placeholder="Date of Birth"
          onFocus={() => setDateFocused(true)}
          onBlur={() => setDateFocused(false)}
        />
      </div>
      <span>Your Address:</span>

      <div className="input-container">
        <input type="text" placeholder="Street" />
      </div>
      <div className="input-container">
        <input type="text" placeholder="City" />
      </div>
      <div className="input-container">
        <input type="text" placeholder="Post code" />
      </div>
      <div className="input-container">
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleCountryChange}
          className={country ? '' : 'placeholder'}
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
        </select>
      </div>

      <Button onClick={() => () => {}}>Create Account</Button>
    </form>
  );
}

export default SignUpForm;
