import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';
import { CustomerData, CustomerAddress } from '../../store/types/customer';
import getCustomerData from '../../api/customer';

export default function AddressPage() {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  // Fetch customer data on component mount
  useEffect(() => {
    getCustomerData().then((data) => {
      setCustomerData(data);
      setAddresses(data?.addresses || []);
    });
  }, []);

  // Handle change for input fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
    setAddresses(updatedAddresses);
  };

  return (
    <div className={styles.wrapperAccount}>
      <div>
        <span>Welcome! </span>
        <span className={styles.name}>
          {customerData?.firstName} {customerData?.lastName}
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
          <h1 className={styles.editProfileHeader}>Edit Your Addresses</h1>
          <div className={styles.editProfileData}>
            <div className={styles.addressesBlock}>
              <span className={styles.headerAddress}>Your Shipping Address:</span>
              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Street Name</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="streetName"
                      value={addresses[0]?.streetName || ''}
                      onChange={(e) => handleInputChange(e, 0)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Street Number</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="streetNumber"
                      value={addresses[0]?.streetNumber || ''}
                      onChange={(e) => handleInputChange(e, 0)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>City</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="city"
                      value={addresses[0]?.city || ''}
                      onChange={(e) => handleInputChange(e, 0)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Post Code</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="postalCode"
                      value={addresses[0]?.postalCode || ''}
                      onChange={(e) => handleInputChange(e, 0)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Country</div>
                  <div className={styles.inputContainer}>
                    <select
                      name="country"
                      value={addresses[0]?.country || ''}
                      onChange={(e) => handleInputChange(e, 0)}
                      disabled={isDisabled}>
                      <option value="" disabled hidden>
                        Select Country
                      </option>
                      <option value="DE">Germany</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}> </div>
              </div>
            </div>

            <div>
              <span className={styles.headerAddress}>Your Billing Address:</span>
              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Street Name</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="streetName"
                      value={addresses[1]?.streetName || ''}
                      onChange={(e) => handleInputChange(e, 1)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Street Number</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="streetNumber"
                      value={addresses[1]?.streetNumber || ''}
                      onChange={(e) => handleInputChange(e, 1)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>City</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="city"
                      value={addresses[1]?.city || ''}
                      onChange={(e) => handleInputChange(e, 1)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Post Code</div>
                  <div className={styles.inputContainer}>
                    <input
                      name="postalCode"
                      value={addresses[1]?.postalCode || ''}
                      onChange={(e) => handleInputChange(e, 1)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Country</div>
                  <div className={styles.inputContainer}>
                    <select
                      name="country"
                      value={addresses[1]?.country || ''}
                      onChange={(e) => handleInputChange(e, 1)}
                      disabled={isDisabled}>
                      <option value="" disabled hidden>
                        Select Country
                      </option>
                      <option value="DE">Germany</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}> </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Link className={styles.cancelLink} to="/account">
                Cancel
              </Link>
              <Button type="button" className="accountPageButton" onClick={() => setIsDisabled((prev) => !prev)}>
                {isDisabled ? 'Change' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
