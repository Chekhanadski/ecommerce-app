import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

export default function AddressPage() {
  const { control } = useForm();

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
          <h1 className={styles.editProfileHeader}>Edit Your Addresses</h1>
          <div className={styles.editProfileData}>
            <div className={styles.addressesBlock}>
              <span className={styles.headerAddress}>Your Shipping Address:</span>
              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Street Name</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="Berlin st." />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Street Number</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="2" />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>City</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="Berlin" />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Post Code</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="111111" />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Country</div>
                  <div className={styles.inputContainer}>
                    <Controller
                      name={`addresses.${1}.country`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="" disabled hidden>
                            Germany
                          </option>
                          <option value="DE">Germany</option>
                          <option value="US">United States</option>
                        </select>
                      )}
                    />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}> </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <label className={styles.checkboxLabel} htmlFor="defaultAddress">
                    <span>
                      <input type="checkbox" id="defaultAddress" name="defaultAddress" />
                    </span>
                    <span>Set as default address.</span>
                  </label>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <label className={styles.checkboxLabel} htmlFor="useAsBillingAddress">
                    <span>
                      <input type="checkbox" id="useAsBillingAddress" name="useAsBillingAddress" />
                    </span>
                    <span>Also use as billing address.</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <span className={styles.headerAddress}>Your Billing Address:</span>
              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Street Name</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="Berlin st." />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Street Number</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="2" />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>City</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="Berlin" />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <div className={styles.nameField}>Post Code</div>
                  <div className={styles.inputContainer}>
                    <input placeholder="111111" />
                  </div>
                </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <div className={styles.nameField}>Country</div>
                  <div className={styles.inputContainer}>
                    <Controller
                      name={`addresses.${1}.country`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="" disabled hidden>
                            Germany
                          </option>
                          <option value="DE">Germany</option>
                          <option value="US">United States</option>
                        </select>
                      )}
                    />
                  </div>
                </div>
                <div className={styles.secondColumnEditProfile}> </div>
              </div>

              <div className={styles.rowEditProfile}>
                <div className={styles.firstColumnEditProfile}>
                  <label className={styles.checkboxLabel} htmlFor="defaultAddress">
                    <span>
                      <input type="checkbox" id="defaultAddress" name="defaultAddress" />
                    </span>
                    <span>Set as default address.</span>
                  </label>
                </div>
                <div className={styles.secondColumnEditProfile}>
                  <label className={styles.checkboxLabel} htmlFor="useAsBillingAddress">
                    <span>
                      <input type="checkbox" id="useAsBillingAddress" name="useAsBillingAddress" />
                    </span>
                    <span>Also use as shipping address.</span>
                  </label>
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
