import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer, toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';
import getCustomerData from '../../api/customer';

export default function AccountPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [isDisabled, setIsDisabled] = useState(true);

  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  // Fetch customer data on component mount
  useEffect(() => {
    getCustomerData().then((data) => {
      setFirstName(data?.firstName ?? '');
      setLastName(data?.lastName ?? '');
      setEmail(data?.email ?? '');
      setDate(data?.dateOfBirth ?? '');
    });
  }, []);

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const notifyChange = () => toast('Data Changed!');

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
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isDisabled} />
                </div>
              </div>
              <div className={styles.secondColumnEditProfile}>
                <div className={styles.nameField}>Last Name</div>
                <div className={styles.value}>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isDisabled} />
                </div>
              </div>
            </div>

            <div className={styles.rowEditProfile}>
              <div className={styles.firstColumnEditProfile}>
                <div className={styles.nameField}>Email</div>
                <div className={styles.value}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isDisabled} />
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
                    notifyChange();
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
