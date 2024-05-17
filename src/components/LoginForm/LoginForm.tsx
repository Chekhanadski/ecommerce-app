import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import styles from './styles.module.css';
import * as regexps from '../../constants/regexps';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
      dob: '',
      street: '',
      city: '',
      postcode: '',
      country: ''
    }
  });

  const [dobActivated, setDobActivated] = useState(false);
  const handleDobFocus = () => setDobActivated(true);

  const validateEmail = (emailString: string) => {
    if (emailString.length && !regexps.emailRegexp.test(emailString.toLowerCase())) {
      return 'Invalid email format';
    }
    if (emailString.length < 1) {
      return 'Email is required';
    }
    return undefined;
  };

  const validatePassword = (passwordString: string) => {
    if (passwordString.length < 1) {
      return 'Password is required';
    }
    if (!regexps.passwordRegexp.test(passwordString)) {
      return 'Password can only contain English letters, digits, and special chars';
    }
    if (!regexps.uppercaseLetterRegexp.test(passwordString)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!regexps.lowercaseLetterRegexp.test(passwordString)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!regexps.digitRegexp.test(passwordString)) {
      return 'Password must contain at least one digit';
    }
    if (passwordString.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return undefined;
  };

  const validateName = (nameString: string) => {
    if (nameString.length && !regexps.nameRegexp.test(nameString)) {
      return 'Name can only contain English letters';
    }
    if (nameString.length < 1) {
      return 'Name is required';
    }
    return undefined;
  };

  const validateSurname = (surnameString: string) => {
    if (surnameString.length < 1) {
      return 'Surname is required';
    }
    if (!regexps.nameRegexp.test(surnameString)) {
      return 'Surname can only contain English letters';
    }
    return undefined;
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
      return 'You must be at least 13 years old';
    }
    if (dobString.length < 1) {
      return 'Date of Birth is required';
    }
    return true;
  };

  const validateStreet = (streetString: string) => {
    if (streetString.length < 1) {
      return 'Street is required';
    }
    return undefined;
  };

  const validateCity = (cityString: string) => {
    if (cityString.length < 1) {
      return 'City is required';
    }
    if (!regexps.cityRegexp.test(cityString)) {
      return 'City can only contain English letters and spaces';
    }
    return undefined;
  };

  const validatePostcode = (postcodeString: string) => {
    if (postcodeString.length < 1) {
      return 'Postcode is required';
    }
    if (!regexps.postcodeRegexp.test(postcodeString)) {
      return 'Postcode must consist of 5 digits';
    }
    return undefined;
  };

  const validateCountry = (countryString: string) => {
    if (countryString === '') {
      return 'Country is required';
    }
    return true;
  };

  const onSubmit = (data: FormData) => data;

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
      <span>Enter your details below</span>

      <div className={styles.inputContainer}>
        <input type="email" placeholder="Email" {...register('email', { validate: validateEmail })} />
        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input type="password" placeholder="Password" {...register('password', { validate: validatePassword })} />
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="Name" {...register('name', { validate: validateName })} />
        {errors.name && <div className={styles.error}>{errors.name.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="Surname" {...register('surname', { validate: validateSurname })} />
        {errors.surname && <div className={styles.error}>{errors.surname.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input
          type={dobActivated ? 'date' : 'text'}
          placeholder={!dobActivated ? 'Date of Birth' : undefined}
          onFocus={handleDobFocus}
          {...register('dob', { validate: validateDob })}
        />
        {errors.dob && <div className={styles.error}>{errors.dob.message}</div>}
      </div>

      <span>Your Address:</span>

      <div className={styles.inputContainer}>
        <input placeholder="Street" {...register('street', { validate: validateStreet })} />
        {errors.street && <div className={styles.error}>{errors.street.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="City" {...register('city', { validate: validateCity })} />
        {errors.city && <div className={styles.error}>{errors.city.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="Post code" {...register('postcode', { validate: validatePostcode })} />
        {errors.postcode && <div className={styles.error}>{errors.postcode.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          rules={{ validate: validateCountry }}
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled hidden>
                Select Country
              </option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
            </select>
          )}
        />
        {errors.country && <div className={styles.error}>{errors.country.message}</div>}
      </div>

      <Button type="submit">Create Account</Button>
    </form>
  );
}
