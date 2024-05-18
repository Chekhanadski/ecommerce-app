import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import styles from './styles.module.css';
import * as regexps from '../../constants/regexps';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm(): React.ReactElement {
  const { register, handleSubmit } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    }
  });

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

  const onSubmit = (data: FormData) => data;

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <span>Enter your details below</span>

      <div className={styles.inputContainer}>
        <input type="email" placeholder="Email" {...register('email', { validate: validateEmail })} />
      </div>

      <div className={styles.inputContainer}>
        <input type="password" placeholder="Password" {...register('password', { validate: validatePassword })} />
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
}
