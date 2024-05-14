import React, { useState, ChangeEvent } from 'react';
import Button from '../Button/Button';
import './styles.css';

function SignUpForm(): React.ReactElement {
  const [dateFocused, setDateFocused] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState('');

  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');

  const [street, setStreet] = useState('');
  const [streetError, setStreetError] = useState('');

  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');

  const [postcode, setPostcode] = useState('');
  const [postcodeError, setPostcodeError] = useState('');

  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');

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

  const validateName = (nameString: string) => {
    if (!/^[A-Za-z]+$/.test(nameString)) {
      return 'Name can only contain English letters.';
    }
    if (nameString.length < 1) {
      return 'Name must contain at least one character.';
    }
    return '';
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    const error = validateName(event.target.value);
    setNameError(error);
  };

  const validateSurname = (surnameString: string) => {
    if (!/^[A-Za-z]+$/.test(surnameString)) {
      return 'Surname can only contain English letters.';
    }
    if (surnameString.length < 1) {
      return 'Surname must contain at least one character.';
    }
    return '';
  };

  const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
    const error = validateSurname(event.target.value);
    setSurnameError(error);
  };

  const validateDob = (dobString: string) => {
    const dobDate = new Date(dobString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const m = currentDate.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < dobDate.getDate())) {
      age -= 1;
    }
    if (age < 13) {
      return 'You must be at least 13 years old.';
    }
    return '';
  };

  const handleDobChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
    const error = validateDob(event.target.value);
    setDobError(error);
  };

  const validateStreet = (streetString: string) => {
    if (streetString.length < 1) {
      return 'Street must contain at least one character.';
    }
    return '';
  };

  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
    const error = validateStreet(event.target.value);
    setStreetError(error);
  };

  const validateCity = (cityString: string) => {
    if (!/^[A-Za-z\s]+$/.test(cityString)) {
      return 'City can only contain English letters and spaces.';
    }
    if (cityString.length < 1) {
      return 'City must contain at least one character.';
    }
    return '';
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    const error = validateCity(event.target.value);
    setCityError(error);
  };

  const validatePostcode = (postcodeString: string) => {
    if (!/^\d{5}$/.test(postcodeString)) {
      return 'Postcode must consist of 5 digits.';
    }
    return '';
  };

  const handlePostcodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostcode(event.target.value);
    const error = validatePostcode(event.target.value);
    setPostcodeError(error);
  };

  const validateCountry = (countryString: string) => {
    if (countryString === '') {
      return 'You must select a country.';
    }
    return '';
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
    const error = validateCountry(event.target.value);
    setCountryError(error);
  };

  const isFormValid = () =>
    email &&
    !emailError &&
    password &&
    !passwordError &&
    name &&
    !nameError &&
    surname &&
    !surnameError &&
    dob &&
    !dobError &&
    street &&
    !streetError &&
    city &&
    !cityError &&
    postcode &&
    !postcodeError &&
    country &&
    !countryError;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid()) {
      // логика отправки здесь
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
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
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        {nameError && <div className="error">{nameError}</div>}
      </div>

      <div className="input-container">
        <input type="text" placeholder="Surname" value={surname} onChange={handleSurnameChange} />
        {surnameError && <div className="error">{surnameError}</div>}
      </div>

      <div className="input-container">
        <input
          type={dateFocused ? 'date' : 'text'}
          placeholder="Date of Birth"
          value={dob}
          onChange={handleDobChange}
          onFocus={() => setDateFocused(true)}
          onBlur={() => setDateFocused(false)}
        />
        {dobError && <div className="error">{dobError}</div>}
      </div>

      <span>Your Address:</span>

      <div className="input-container">
        <input type="text" placeholder="Street" value={street} onChange={handleStreetChange} />
        {streetError && <div className="error">{streetError}</div>}
      </div>

      <div className="input-container">
        <input type="text" placeholder="City" value={city} onChange={handleCityChange} />
        {cityError && <div className="error">{cityError}</div>}
      </div>

      <div className="input-container">
        <input type="text" placeholder="Post code" value={postcode} onChange={handlePostcodeChange} />
        {postcodeError && <div className="error">{postcodeError}</div>}
      </div>

      <div className="input-container">
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleCountryChange}
          className={country ? '' : 'placeholder'}>
          <option value="">Select Country</option>
          <option value="Germany">Germany</option>
          <option value="USA">USA</option>
        </select>
        {countryError && <div className="error">{countryError}</div>}
      </div>

      <Button type="submit" disabled={!isFormValid()}>
        Create Account
      </Button>
    </form>
  );
}

export default SignUpForm;
