import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import styles from './styles.module.css';
import * as regexps from '../../constants/regexps';
import { signUp } from '../../api/auth';
import { FormData } from '../../store/types/auth';

const DEFAULT_ADDRESS_INDEX = 0;

function SignUpForm(): React.ReactElement {
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
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      addresses: [
        {
          streetName: '',
          streetNumber: '',
          city: '',
          postalCode: '',
          country: ''
        }
      ],
      defaultShippingAddress: null,
      defaultBillingAddress: null
    }
  });

  const [dobActivated, setDobActivated] = useState(false);
  const handleDobFocus = () => setDobActivated(true);

  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefaultAddress(event.target.checked);
  };

  const onSubmit = async (data: FormData) => {
    let fullData: FormData = data;

    if (isDefaultAddress) {
      fullData = {
        ...data,
        defaultShippingAddress: DEFAULT_ADDRESS_INDEX,
        defaultBillingAddress: DEFAULT_ADDRESS_INDEX
      };
    }

    const result = await signUp(fullData);
    if (typeof result === 'string') {
      setErrorMessage(result);
      setIsRegistered(false);
    } else {
      setIsRegistered(result);
      setErrorMessage('');
    }
  };

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
      return 'First name can only contain English letters';
    }
    if (nameString.length < 1) {
      return 'First name is required';
    }
    return undefined;
  };

  const validateLastName = (surnameString: string) => {
    if (surnameString.length < 1) {
      return 'Last name is required';
    }
    if (!regexps.nameRegexp.test(surnameString)) {
      return 'Last name can only contain English letters';
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
      return 'Street name is required';
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
      return 'Postal code is required';
    }
    if (!regexps.postcodeRegexp.test(postcodeString)) {
      return 'Postal code must consist of 5 digits';
    }
    return undefined;
  };

  const validateCountry = (countryString: string) => {
    if (countryString === '') {
      return 'Country is required';
    }
    return true;
  };

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
        <input placeholder="First Name" {...register('firstName', { validate: validateName })} />
        {errors.firstName && <div className={styles.error}>{errors.firstName.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="Last Name" {...register('lastName', { validate: validateLastName })} />
        {errors.lastName && <div className={styles.error}>{errors.lastName.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <input
          type={dobActivated ? 'date' : 'text'}
          placeholder={!dobActivated ? 'Date of Birth' : undefined}
          onFocus={handleDobFocus}
          {...register('dateOfBirth', { validate: validateDob })}
        />
        {errors.dateOfBirth && <div className={styles.error}>{errors.dateOfBirth.message}</div>}
      </div>

      <span>Your Address:</span>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputContainer}>
          <input placeholder="Street Name" {...register(`addresses.${0}.streetName`, { validate: validateStreet })} />
          {errors.addresses?.[0]?.streetName && (
            <div className={styles.error}>{errors.addresses[0].streetName.message}</div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            placeholder="Street Number"
            {...register(`addresses.${0}.streetNumber`, { validate: validateStreet })}
          />
          {errors.addresses?.[0]?.streetNumber && (
            <div className={styles.error}>{errors.addresses[0].streetNumber.message}</div>
          )}
        </div>
      </div>

      <div className={styles.inputsWrapper}>
        <div className={styles.inputContainer}>
          <input placeholder="City" {...register(`addresses.${0}.city`, { validate: validateCity })} />
          {errors.addresses?.[0]?.city && <div className={styles.error}>{errors.addresses[0].city.message}</div>}
        </div>

        <div className={styles.inputContainer}>
          <input placeholder="Post code" {...register(`addresses.${0}.postalCode`, { validate: validatePostcode })} />
          {errors.addresses?.[0]?.postalCode && (
            <div className={styles.error}>{errors.addresses[0].postalCode.message}</div>
          )}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <Controller
          name={`addresses.${0}.country`}
          control={control}
          defaultValue=""
          rules={{ validate: validateCountry }}
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled hidden>
                Select Country
              </option>
              <option value="DE">Germany</option>
              <option value="US">United States</option>
            </select>
          )}
        />
        {errors.addresses?.[0]?.country && <div className={styles.error}>{errors.addresses[0].country.message}</div>}
      </div>

      <label className={styles.checkboxLabel} htmlFor="defaultAddress">
        <span>
          <input
            type="checkbox"
            id="defaultAddress"
            name="defaultAddress"
            checked={isDefaultAddress}
            onChange={handleCheckboxChange}
          />
        </span>
        <span>Set as default address.</span>
      </label>

      <div className={styles.messageContainer}>
        {isRegistered && <div className={styles.success}>Account successfully created!</div>}
        {errorMessage && <div className={styles.serverError}>{errorMessage}</div>}
        <Button type="submit">Create Account</Button>
      </div>
    </form>
  );
}

export default SignUpForm;
