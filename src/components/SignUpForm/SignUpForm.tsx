import React from 'react';
import Button from '../Button/Button';
import './styles.css';

function SignUpForm(): React.ReactElement {
  return (
    <form className="sign-up-form">
      <span>Enter your details below</span>
      <input id="email" type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Surname" />
      <input type="date" placeholder="Date of Birth" />
      <div className="form-address">
        <span>Address:</span>
        <input type="text" placeholder="Street" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Post code" />
        <input type="text" placeholder="Country" />
      </div>
      <Button onClick={() => () => {}}>Create Account</Button>
    </form>
  );
}

export default SignUpForm;
