import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const AdminSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(phoneNumber, password);
      console.log('Successfully signed in!');
      // Do something after successful sign-in
    } catch (error) {
      console.log('Error signing in:', error);
      // Handle sign-in error
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '300px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
        }}
      >
        <form onSubmit={handleSignIn}>
          <label>
            Phone Number:
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              style={{ marginBottom: '10px', width: '100%' }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ marginBottom: '10px', width: '100%' }}
            />
          </label>
          <button
            type="submit"
            style={{ width: '100%', borderRadius: '5px' }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;