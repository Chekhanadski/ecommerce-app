import React, { useState, ChangeEvent } from 'react';
import Button from '../Button/Button';
import './styles.css';

function SignUpForm(): React.ReactElement {
  const [dateFocused, setDateFocused] = useState(false);
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (emailString: string) => {
    const re =
      /^(([^<>()\\.,;:@"]+(\.[^<>()\\.,;:@"+]*)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <form
      className="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault(); /* your submit logic here */
      }}>
      <span>Enter your details below</span>
      <div className="input-container">
        <input id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <input type="password" placeholder="Password" />
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Surname" />
      <input
        type={dateFocused ? 'date' : 'text'}
        placeholder="Date of Birth"
        onFocus={() => setDateFocused(true)}
        onBlur={() => setDateFocused(false)}
      />
      <div className="form-address">
        <span>Address:</span>
        <input type="text" placeholder="Street" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Post code" />
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleCountryChange}
          className={country ? '' : 'placeholder'}>
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
