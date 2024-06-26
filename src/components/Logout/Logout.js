import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Logout.css';  // This should reference the correct CSS file

const Logout = () => {
  const logOut = () => {
    signOut(auth).catch((err) => console.error(err));
  };

  return (
    <div className="logout-container">
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Logout;
