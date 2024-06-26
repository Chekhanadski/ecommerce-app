import React, { useState, useEffect, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import state from '../../store/appState';
import Button from '../Button/Button';
import styles from './styles.module.css';
import * as regexps from '../../constants/regexps';
import { loginUser } from '../../api/auth';
import { LoginData } from '../../store/types/auth';
import { StoreContext } from '../../store/store';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { setStore } = useContext(StoreContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const redirectToMain = () => {
    navigate('/');
  };

  // check if user is already registered
  const snap = useSnapshot(state);

  useEffect(() => {
    if (snap.isAuthorized) {
      navigate('/');
    }
  }, [snap.isAuthorized, navigate]);

  const onSubmit = async (data: LoginData) => {
    try {
      await loginUser(data);
      setLoginError('');
      setLoginSuccess(true);
      state.isAuthorized = true;
      setStore((prevStore) => ({ ...prevStore, isAuthorized: true }));
      navigate('/');
      redirectToMain();
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
        setLoginSuccess(false);
      } else {
        setLoginError('An error occurred');
      }
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

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.h1}>Enter your details below</h1>

      <div className={styles.inputContainer}>
        <input type="email" placeholder="Email" {...register('email', { validate: validateEmail })} />
        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputPasswordContainer}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { validate: validatePassword })}
          />
          <button type="button" onClick={togglePasswordVisibility} className={styles.eyeIcon}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      </div>

      <div className={styles.messageContainer}>
        {loginError ? <div className={styles.serverError}>{loginError}</div> : null}{' '}
        {loginSuccess ? <div className={styles.success}>Login successful!</div> : null}
        <Button type="submit" className="loginPageButton">
          Sign in
        </Button>
      </div>

      <div className={styles.logInContainer}>
        <span className="styles.logInText">Haven&apos;t registered yet?</span>
        <Link className={styles.logInLink} to="/register">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
