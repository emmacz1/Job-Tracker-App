import React, { useContext } from 'react';
import { AuthContext } from '../../auth/auth';
import './Welcome.css';

const Welcome = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : '';

  return (
    <div className="welcome">
      <h2>Welcome {currentUserEmail}</h2>
      <p>Job Portal</p>
    </div>
  );
};

export default Welcome;
