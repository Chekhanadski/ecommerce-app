import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

export default function AccountPage() {
  const [date, setDate] = useState('1991-01-01');

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
        <span className={styles.name}>Chekhanadski Andrei</span>
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

          <div className={styles.editProfileData}>
            <div className={styles.rowEditProfile}>
              <div className={styles.firstColumnEditProfile}>
                <div className={styles.nameField}>First Name</div>
                <div className={styles.value}>
                  <input placeholder="Andrei" />
                </div>
              </div>
              <div className={styles.secondColumnEditProfile}>
                <div className={styles.nameField}>Last Name</div>
                <div className={styles.value}>
                  <input placeholder="Chekhanadski" />
                </div>
              </div>
            </div>

            <div className={styles.rowEditProfile}>
              <div className={styles.firstColumnEditProfile}>
                <div className={styles.nameField}>Email</div>
                <div className={styles.value}>
                  <input type="email" placeholder="andrei@gmail.com" />
                </div>
              </div>
              <div className={styles.secondColumnEditProfile}>
                <div className={styles.nameField}>Date of Birth</div>
                <div className={styles.value}>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="01.01.1991"
                    className={styles.dateInput}
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
              <Link className={styles.cancelLink} to="/account">
                Cancel
              </Link>
              <Button type="button" className="accountPageButton">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
