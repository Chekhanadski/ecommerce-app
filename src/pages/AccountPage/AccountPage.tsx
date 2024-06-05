import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';
import { getCustomerData, updateCustomerData } from '../../api/customer';
import * as regexps from '../../constants/regexps';

export default function AccountPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [isDisabled, setIsDisabled] = useState(true);

  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const [version, setVersion] = useState(0);

  // Fetch customer data on component mount
  useEffect(() => {
    getCustomerData().then((data) => {
      setFirstName(data?.firstName ?? '');
      setLastName(data?.lastName ?? '');
      setEmail(data?.email ?? '');
      setDate(data?.dateOfBirth ?? '');
      setVersion(data?.version ?? 0);
      console.log(data);
    });
  }, []);

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const notifyChange = () => toast('Data Changed!');
  const notifyError = () => toast('Some Error Happend!');

  function updateData() {
    const customerData = {
      version,
      actions: [
        {
          action: 'setFirstName',
          firstName
        },
        {
          action: 'setLastName',
          lastName
        },
        {
          action: 'changeEmail',
          email
        },
        {
          action: 'setDateOfBirth',
          date
        }
      ]
    };
    console.log('customerData', JSON.stringify(customerData));

    updateCustomerData(JSON.stringify(customerData))
      .then(() => {
        notifyChange();
      })
      .catch(() => {
        notifyError();
      });
  }

  const validateEmail = (emailString: string) => {
    if (emailString.length && !regexps.emailRegexp.test(emailString.toLowerCase())) {
      return 'Invalid email format';
    }
    if (emailString.length < 1) {
      return 'Email is required';
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

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className={styles.wrapperAccount}>
      <div>
        <span>Welcome! </span>
        <span className={styles.name}>
          {firstName} {lastName}
        </span>
      </div>
      <main className={styles.wrapperMain}>
        <div className={styles.manageAccount}>
          <div className={styles.manageAccountHeader}>Manage My Account</div>
          <Link className={styles.manageAccountCategory} to="/account">
            My Profile
          </Link>
          <Link className={styles.manageAccountCategory} to="/account/address">
            Address book
          </Link>
        </div>
        <div className={styles.editProfile}>
          <h1 className={styles.editProfileHeader}>Edit Your Profile</h1>

          <div className={`${styles.editProfileData} ${!isDisabled && styles.editProfileModal}`}>
            <div className={styles.rowEditProfile}>
              <div className={styles.firstColumnEditProfile}>
                <div className={styles.nameField}>First Name</div>
                <div className={styles.value}>
                  <input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    disabled={isDisabled}
                  />
                  <div className={styles.error}>{validateName(firstName) ? validateName(firstName) : null}</div>
                </div>
              </div>
              <div className={styles.secondColumnEditProfile}>
                <div className={styles.nameField}>Last Name</div>
                <div className={styles.value}>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isDisabled} />
                  <div className={styles.error}>{validateLastName(lastName) ? validateLastName(lastName) : null}</div>
                </div>
              </div>
            </div>

            <div className={styles.rowEditProfile}>
              <div className={styles.firstColumnEditProfile}>
                <div className={styles.nameField}>Email</div>
                <div className={styles.value}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isDisabled} />
                  <div className={styles.error}>{validateEmail(email) ? validateEmail(email) : null}</div>
                </div>
              </div>
              <div className={styles.secondColumnEditProfile}>
                <div className={styles.nameField}>Date of Birth</div>
                <div className={styles.value}>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={styles.dateInput}
                    disabled={isDisabled}
                  />
                  <div className={styles.error}>{validateDob(date) ? validateDob(date) : null}</div>
                </div>
              </div>
            </div>

            <div className={styles.rowEditProfile}>
              <div className={styles.firstColumnEditProfilePassword}>
                <div className={styles.nameField}>Password Changes</div>

                <div className={`${styles.value} ${styles.inputPasswordContainer} `}>
                  {' '}
                  <input type={currentPasswordVisible ? 'text' : 'password'} placeholder="Current Password" />
                  <button type="button" onClick={toggleCurrentPasswordVisibility} className={styles.eyeIcon}>
                    {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className={`${styles.value} ${styles.inputPasswordContainer} `}>
                  {' '}
                  <input type={newPasswordVisible ? 'text' : 'password'} placeholder="New Password" />
                  <button type="button" onClick={toggleNewPasswordVisibility} className={styles.eyeIcon}>
                    {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className={`${styles.value} ${styles.inputPasswordContainer} `}>
                  {' '}
                  <input type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Confirm New Password" />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className={styles.eyeIcon}>
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.cancelLink} to="/account" onClick={() => setIsDisabled(true)}>
                Cancel
              </Link>
              <Button
                type="button"
                className="accountPageButton"
                onClick={() => {
                  setIsDisabled((current) => !current);
                  if (!isDisabled) {
                    updateData();
                  }
                }}>
                {isDisabled ? 'Change Your Data' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
