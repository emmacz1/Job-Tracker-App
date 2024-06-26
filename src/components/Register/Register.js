import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './Register.css';

const Register = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resetInput();
        onClose(); // Close the form after successful registration
      })
      .catch((err) => console.error(err));
  };

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="inputBox">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Register;
